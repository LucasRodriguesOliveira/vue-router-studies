import Vue from 'vue';
import VueRouter from 'vue-router';

import Contatos from './views/Contatos/Contatos';
import ContatoDetalhes from './views/Contatos/ContatoDetalhes';
import ContatoEditar from './views/Contatos/ContatoEditar';
import ContatoHome from './views/Contatos/ContatosHome';
import Home from './views/Home';
import Erro404 from './views/Erro404';
import Erro404Contatos from './views/Contatos/Erro404';
import Login from './views/login/Login';
import EventBus from './event-bus';

Vue.use(VueRouter);

const validarId = r => ({ id: +r.params.id });

const router = new VueRouter({
  mode: "history",
  linkActiveClass: 'active',
  routes: [
    {
      path: '/contatos',
      component: Contatos,
      alias: ['/meus-contatos', '/lista-de-contatos'],
      // props: route => {
      //   const busca = route.query.busca;
      //   return busca ? { busca } : {};
      // },
      props: r => r.query.busca ? { busca: r.query.busca } : {},
      children: [
        {
          path: ':id(\\d+)',
          component: ContatoDetalhes,
          name: 'contato',
          props: validarId
        },
        {
          path: ':id(\\d+)/editar',
          alias: ':id(\\d+)/alterar',
          meta: {
            auth: true
          },
          components: {
            default: ContatoEditar,
            'contato-detalhes': ContatoDetalhes
          },
          props: {
            default: validarId,
            'contato-detalhes': validarId
          }
        },
        { path: '', component: ContatoHome, name: 'contatos' },
        { path: '*', component: Erro404Contatos },
      ]
    },
    { path: '/home', component: Home },
    { path: '/login', component: Login },
    {
      path: '/',
      redirect: () => ({name: 'contatos'})
    },
    { path: '*', component: Erro404 }
  ]
});

router.beforeEach((...p) => {
  const isAuth = EventBus.auth;
  if(p[0].matched.some(r => r.meta.auth) && !isAuth) {
    p[2]({
      path: '/login',
      query: { redirect: p[0].fullPath }
    });
    return;
  }
  p[2]();
});

export default router;