<template>
  <div style="width: 100%" class="home">
    <tr v-show = "isLoading.list">
      <td colspan = 4>Carregando Tarefas...</td>
    </tr>

    <div v-show = "!isLoading.list">
      <Button type="primary" @click.native="() => showForm = !showForm">Adicionar Tarefa</Button>
      
      <div v-show = "isLoading.form">Carregando Formulário (salvando)...</div>

      <div v-show = "!isLoading.form">
        <div v-show="errorMessage" class="error alert">{{errorMessage}}</div>

        <transition name="fade">
          <FormTask
          v-if="showForm"
          :task="task"
          :error-message="errorMessage"
          @add-task="addTask"
          @update-task="updateTask"
          @close-form="resetForm"
          @validate-email="validateEmail"
          />
        </transition>
      </div>

      <br/>

      <Tasks
        :tasks="tasks"
        :is-loading="isLoading"
        @remove="remove"
        @edit="edit"
        @finish-task="finishTask"
      />
    </div>
  </div>
</template>

<script>
import Tasks from '../components/Tasks.vue';
import FormTask from '../components/FormTask.vue';
import Button from '../components/Button.vue';
// import controller from '../../../services/controller.js';

export default {
  components: {
    Tasks,
    FormTask,
    Button,
  },
  data() {
    return {
      task: '',
      tasks: [],
      showForm: false,
      isLoading: {},
      errorMessage: '',
    };
  },
  async mounted() {
    this.getList();
  },
  methods: {
    async getList() {
      const res = await this.request({ id: 'list', url: 'http://localhost:3333/tasks'});

      if (res && Array.isArray(res.data)) this.tasks = res.data;
    },

    async request({ id, method = 'GET', url, data = '' } = {}) {
      if (this.isLoading[id]) return;

      this.$set(this.isLoading, id, true);
      this.errorMessage = '';

      try {
        const res = await axios({
          method,
          url,
          data,
        });
        console.log('res axios', res);
        
        this.resetForm();

        return res;
      } catch (err) {
        console.error('error axios', err);
        this.errorMessage = err.response.data;
      } finally {
        this.$set(this.isLoading, id, false);
      }
    },
    async addTask(task) {
      console.log('task', task);
      
      const res = await this.request({
        id: 'form',
        method: 'POST',
        url: 'http://localhost:3333/task',
        data: task,
      });
      console.log('res', res);
      

      if (res && res.status === 201) {
        console.log('res', res);
        this.tasks.push(res.data);
      }
    },
    async remove(index) {
      const { id } = this.tasks[index];

      const res = await this.request({
        id,
        method: 'DELETE',
        url: `http://localhost:3333/task/${id}`,
      });

      if (res && res.status === 200) {
        this.tasks.splice(index, 1);
      }
    },
    edit(index) {
      this.task = this.tasks[index];

      this.showForm = false;

      this.$nextTick(() => {
        this.showForm = true;
      });
    },
    async finishTask(task) {
      console.log('TODO FINALIZA TASK');
      
      this.$set(task, 'isFinished', true);

      await this.updateTask(task);
    },
    async updateTask(task) {
      const res = await this.request({
        id: 'form',
        method: 'PUT',
        url: `http://localhost:3333/task/${id}`,
        data: task,
      });

      if (res.status === 200) {
        const index = this.tasks.findIndex(l => task.id === l.id);
        this.tasks.splice(index, 1, task);
      }
    },
    resetForm() {
      this.showForm = false;
      this.task = '';
    },

    async validateEmail(email) {
      this.errorMessage = '';

      const response = await axios.get('https://apilayer.net/api/check', {
        params: {
          access_key: 'f20f7ae318c34b92ee6a685fac758feb',
          email: email,
        },
      });

      if (response.data.success === false) {
        console.log('Problemas para comunicar com a API.');

        const formatValid = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(email);

        if (!formatValid)
          this.errorMessage = 'Email incorreto!';

        return;
      }

      if (!response.data.format_valid || !response.data.mx_found)
        this.errorMessage = `Email incorreto! Sugestão: ${response.data.did_you_mean}`;
    }
  },
};
</script>

<style>
  .error{
    color:tomato;
    border-color: red;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
