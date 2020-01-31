<template>
  <div id="app">
    <div class="jumbotron">
      <h1 class="display-4">Vue Router</h1>
      <p class="lead">Adicionando rotas a Single Page Applications no Vue.</p>
    </div>

    <div class="container">
      <router-link exact to="/home"
        class="btn btn-info mb-4 mr-2">Home</router-link>
      <router-link to="/contatos"
        class="btn btn-info mb-4 ml-2">Contatos</router-link>
      <router-link to="/contatos/1"
        class="btn btn-info mb-4 ml-2">Contatos 1</router-link>
      <router-link to="/contatos/2"
        class="btn btn-info mb-4 ml-2">Contatos 2</router-link>
      <transition name="slide" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped>
  .slide-enter, .slide-leave-to {
    transform: translateX(-50px);
    opacity: 0;
  }

  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s;
  }
</style>
