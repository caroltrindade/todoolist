<template>
  <div>
    <table class="table table-responsive table-hover">
      <thead>
        <tr>
          <th style="width: 20%">ID</th>
          <th style="width: 20%">Descrição</th>
          <th style="width: 40%">Responsável</th>
          <th style="width: 20%">Ação</th>
        </tr>
      </thead>
      <tbody>
        <tr v-show = "tasks.length === 0">
          <td colspan = 4>Não há tarefas cadastradas</td>
        </tr>
        <tr v-for="(task, index) in tasks" :key="task.id">
          <td style="width: 20%">{{task.id}}</td>
          <td style="width: 20%">{{task.solicitante}}</td>
          <td style="width: 40%">
            {{task.solicitado}}
            <span v-if="task.urgente">URGENTE</span>
            <span v-else-if="!task.urgente">relaxxxx</span>
          </td>
          <td style="width: 20%">
            <Loading v-if="isLoading[task.id]">Carregando...</Loading>

            <template v-if="!isLoading[task.id]">
              <Button type="secondary" icon="fa-check" @click.native="finishTask(index)">Finalizar</Button>
              &nbsp;
              <Button type="primary" icon="fa-edit" @click.native="edit(index)">Editar</Button>
              &nbsp;
              <Button type="secondary" icon="fa-trash-alt" @click.native="remove(index)">Excluir</Button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import Button from './Button.vue';
import Loading from './Loading.vue';

export default {
  components: {
    Button,
    Loading
  },
  props: ['tasks', 'isLoading'],
  methods: {
    remove(index) {
      this.$emit('remove', index);
    },
    edit(index) {
      this.$emit('edit', index);
    },
    finishTask() {
      this.$emit('finish-task', index);
    }
  },
};
</script>

<style>
  .table-hover tbody tr:hover{
    background-color: #EFF8F7;
  }
  .table thead{
    background-color: #EFF8F7;
  }
  .table-responsive {
    display: block;
    position: relative;
    width: 100%;
  }
  .table-responsive thead,
  .table-responsive tbody,
  .table-responsive tr {
    display: block;
  }
  .table-responsive th,
  .table-responsive td {
    display: inline-block;
    text-align: center;
  }
</style>
