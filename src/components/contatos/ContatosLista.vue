<template>
  <div>
    <h3 class="font-weight-light">Contatos</h3>

    <div class="form-group">
      <input type="search"
        class="form-control"
        placeholder="Buscar contatos"
        @keyup.enter="buscar"
        :value="busca"
      >
    </div>

    <ul class="list-group" v-if="contatosFiltrados.length > 0">
      <ContatosListaItem class="list-group-item"
        v-for="contato in contatosFiltrados"
        :key="contato.id"
        :contato="contato"/>
    </ul>
    <p v-else>Nenhum contato cadastrado</p>

    <button class="btn btn-secondary mt-4 mb-4" @click="voltar">Voltar</button>
  </div>
</template>

<script>
import ContatosListaItem from './ContatosListaitem';
import EventBus from '../../event-bus';

export default {
  components: {
    ContatosListaItem
  },
  props: ['busca'],
  data() {
    return {
      contatos: []
    }
  },
  computed: {
    contatosFiltrados() {
      const busca = this.busca;
      return !busca ?
        this.contatos :
        this.contatos.filter(item =>
        item.nome.toLowerCase().includes(busca.toLowerCase()));
    }
  },
  created() {
    this.contatos = EventBus.contacts;
  },
  methods: {
    voltar() { this.$router.back(); },
    buscar(event) {
      this.$router.push({
        path: '/contatos',
        query: {
          busca: event.target.value
        }
      });
    }
  }
}
</script>