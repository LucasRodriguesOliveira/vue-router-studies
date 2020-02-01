import Vue from 'vue';

export default new Vue({
  data: {
    auth: false,
    contacts: [
      { id: 1, nome: 'Lucas Oliveira', email: 'lucasoliveira@email.com' },
      { id: 2, nome: 'Ana Flávia', email: 'ana@email.com' },
      { id: 3, nome: 'Maria Clara', email: 'maria@email.com' }
    ]
  },
  created() {
    this.$on('auth', auth => {
      this.auth = auth;
    });
  },
  methods: {
    fetchContact(id) {
      return this.contacts.find(c => c.id === id);
    },
    updateContact(contact) {
      const idx = this.contacts.findIndex(c => c.id === contact.id);
      this.contacts.splice(idx, 1, contact);
    }
  }
});