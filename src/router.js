import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import('./views/Home');
const Contatos = () => import(/* webpackChunkName: "contatos" */'./views/Contatos/Contatos');
const ContatoDetalhes = () => import(/* webpackChunkName: "contatos" */'./views/Contatos/ContatoDetalhes');
const ContatoEditar = () => import(/* webpackChunkName: "contatos" */'./views/Contatos/ContatoEditar');
const ContatoHome = () => import(/* webpackChunkName: "contatos" */'./views/Contatos/ContatosHome');
const Erro404 = () => import('./views/Erro404');
const Erro404Contatos = () => import('./views/Contatos/Erro404');
const Login = () => import('./views/login/Login');
import EventBus from './event-bus';

Vue.use(VueRouter);

const validarId = r => ({ id: +r.params.id });

const router = new VueRouter({
  mode: "history",
  linkActiveClass: 'active',
  scrollBehavior(...p) {
    return new Promise((res) => {
      setTimeout(() => {
        if(p[2]) {
          return res(p[2]);
        }
        else if(p[0].hash)
          return res({
            selector: p[0].hash,
            offset: {
              x: 0, y: 0
            }
          });
        else {
          return res({
            x: 0, y: 0
          });
        }
      }, 3000);
    });
    
  },
  routes: [
    {
      path: '/contatos',
      component: Contatos,
      alias: ['/meus-contatos', '/lista-de-contatos'],
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