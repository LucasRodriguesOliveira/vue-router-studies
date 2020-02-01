<template>
  <div v-if="contato">
    <h3 class="font-weight-light">Nome: {{ contato.nome }}</h3>

    <form @submit.prevent="salvar">
      <div class="form-group">
        <label>Nome</label>
        <input type="text"
          class="form-control"
          placeholder="Insira o nome"
          v-model="contato.nome">
      </div>
      <div class="form-group">
        <label>E-mail</label>
        <input type="text"
          class="form-control"
          placeholder="Insira o e-mail"
          v-model="contato.email">
      </div>
      <button class="btn btn-secondary mb-4 mt-4 mr-2"
        @click="$router.back()"
      >Voltar</button>
      <button class="btn btn-success mb-4 mt-4 ml-2"
        type="submit"
      >Salvar</button>
    </form>
  </div>
</template>

<script>
import EventBus from '../../event-bus';

export default {
  props: ['id'],
  data() {
    return {
      contato: undefined,
      isCanceled: true
    }
  },
  beforeRouteEnter(...p) {
    p[2](vm => {
      vm.contato = EventBus.fetchContact(+p[0].params.id);
    });
  },
  beforeRouteLeave(...p) {
    this.isCanceled ?
      p[2](window.confirm('Deseja realmente sair?')) :
      p[2]();
  },
  methods: {
    salvar() {
      EventBus.updateContact(this.contato);
      this.$router.push('/contatos');
      this.isCanceled = false;
    }
  }
}
</script>