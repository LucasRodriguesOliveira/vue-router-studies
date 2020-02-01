<template>
  <div v-if="contato">
    <h3 class="font-weight-light">Nome: {{ contato.nome }}</h3>
    <p>{{ contato.email }}</p>
    <button class="btn btn-secondary mr-2" @click="$router.back()">Voltar</button>
    <router-link :to="`/contatos/${id}/editar`"
      class="btn btn-primary">Editar</router-link>
  </div>
</template>

<script>
import EventBus from '../../event-bus';

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      contato: undefined
    }
  },
  // created() {
  //   this.contato = EventBus.fetchContact(this.id);
  // }
  beforeRouteEnter(...p) {
    p[2](vm => {
      // vm.contato = EventBus.fetchContact(vm.id);
      vm.contato = EventBus.fetchContact(+p[0].params.id);
    });
  },
  beforeRouteUpdate(...p) {
    this.contato = EventBus.fetchContact(+p[0].params.id);
    p[2]();
  }
}
</script>