<template>
  <div>
    <form @submit.prevent="saveTask()" class="m-2">
      <div style="text-align: right" size="100%">
        <Button type="primary" @click.native.prevent="closeForm">Fechar</Button>
      </div>

      <div v-if="editing"></div>

      <fieldset :class="{'error': errorMessage}" class="form-group">
        <legend :class="{'error': errorMessage}">
          {{ editing ? `Você está editando a tarefa ${ formTask.id }` : "Adicionar Tarefa"}}
        </legend>

        <div class="form-row align-items-center">
          <div class="col">
            <label>
              Descrição
              <input type="text" class="form-control" size="100%" v-model="formTask.description" required />
            </label>
          </div>
          <div class="col m-2">
            <label>
              Nome do Responsável
              <input
                type="text"
                class="form-control"
                size="100%"
                v-model="formTask.responsibleName"
                required
              />
            </label>
          </div>
          <div class="col m-2">
            <label>
              E-mail do Responsável
              <input
                type="text"
                class="form-control"
                size="100%"
                v-model="formTask.responsibleEmail"
                @blur="validateEmail()"
                required
              />
            </label>
          </div>
        </div>

        <br/>

        <Button type="submit" class="btn btn-primary">{{ editing ? "Atualizar Tarefa" : "Adicionar Tarefa"}}</Button>
        &nbsp;
        <Button type="primary" @click.native="cancel" class="btn btn-primary">Cancelar</Button>
      </fieldset>
    </form>
  </div>
</template>

<script>
import Button from './Button.vue';

const newTask = {
  id: '',
  description: '',
  responsibleName: '',
  isFinished: false,
};

export default {
  components: {
    Button,
  },
  props: ['task', 'errorMessage'],
  data() {
    return {
      formTask: { ...newTask },
      editing: false,
    };
  },
  mounted() {
    if (this.task) {
      this.formTask = { ...this.task }
      this.editing = true;
    } else {
      this.editing = false;
      this.formTask = { ...this.newTask };
    }
  },
  methods: {
    saveTask() {
      const taskToInsert = { ...this.formTask };
      console.log('taskToInsert', taskToInsert);

      if (!this.editing) {
        this.$emit('add-task', taskToInsert);
      } else {
        this.$emit('update-task', taskToInsert);
      }
    },
    cancel() {
      this.formTask = { ...this.newTask };
      this.editing = false;
    },
    closeForm() {
      this.$emit('close-form');
    },
    validateEmail() {
      this.$emit('validate-email', this.formTask.responsibleEmail);
    },
  },
};
</script>

<style>
  .error{
    color: tomato;
    border-color: red;
  }
</style>
