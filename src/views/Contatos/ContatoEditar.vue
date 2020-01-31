<template>
  <div>
    <h3 class="font-weight-light">Editar contato com o id: {{ id }}</h3>
    <button class="btn btn-secondary mb-4 mt-4" @click="$router.back()">Voltar</button>
  </div>
</template>

<script>
export default {
  props: ['id']
}
</script>