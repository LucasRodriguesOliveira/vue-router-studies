import Vue from 'vue';

export default new Vue({
  data: {
    auth: false
  },
  created() {
    this.$on('auth', auth => {
      this.auth = auth;
    });
  }
});