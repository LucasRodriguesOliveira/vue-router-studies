<template>
  <div>
    <h3 class="font-weight-light">Detalhes sobre o contato {{ id }}</h3>
    <div style="height: 900px"></div>
    <p id="parametros">Parametros</p>
    <router-link :to="`/contatos/${id}/editar`"
      class="btn btn-primary">Editar</router-link>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  }
}
</script>