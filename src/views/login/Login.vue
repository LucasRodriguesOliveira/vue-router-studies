<template>
  <form class="form-signin" @submit.prevent="entrar">
    <h1 class="h3 mb-3 font-weight-normal">Faça seu login</h1>
    <label class="sr-only">E-mail</label>
    <input type="email"
      class="form-control"
      placeholder="Seu e-mail"
      required
      autofocus
      v-model="usuario.email">
    <label class="sr-only">Senha</label>
    <input type="password"
      class="form-control"
      placeholder="Sua senha"
      required
      v-model="usuario.senha">
    <button class="btn btn-large btn-primary btn-block" type="submit">Entrar</button>
    <div class="alert alert-danger mt-3" v-if="mensagem">{{ mensagem }}</div>
  </form>
</template>

<script>
import EventBus from '../../event-bus';

export default {
  data() {
    return {
      usuario: {
        email: '',
        senha: ''
      },
      mensagem: ''
    }
  },
  methods: {
    entrar() {
      if(this.usuario.email === 'lucas@email.com' && this.usuario.senha === 'admin') {
        EventBus.$emit('auth', true);
        const dest = this.$route.query.redirect || '/contatos';
        this.$router.push(dest);
        return;
      }

      this.mensagem = 'Dados incorretos!';
      setInterval(() => this.mensagem = '', 3000);
    }
  }
}
</script>

<style>
  .form-signin {
    width: 100%;
    max-width: 330px;
    padding: 15px;
    margin: auto;
  }

  .form-signin, .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }
</style>