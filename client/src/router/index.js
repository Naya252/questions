import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'ask',
    component: () =>
      import(/* webpackChunkName: "ask" */ '../views/AskView.vue'),
  },
  {
    path: '/questions',
    name: 'questions',
    component: () =>
      import(
        /* webpackChunkName: "questions" */ '../views/questions/QuestionsView.vue'
      ),
  },
  {
    path: '/questions/:id',
    name: 'question',
    component: () =>
      import(/* webpackChunkName: "question" */ '../views/questions/_id.vue'),
  },
  {
    path: '/about',
    name: 'faq',
    component: () =>
      import(/* webpackChunkName: "faq" */ '../views/FaqView.vue'),
  },
  {
    path: '*',
    name: 'error',
    meta: { layout: 'error' },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    let position = { x: 0, y: 0 };
    if (savedPosition) {
      position = savedPosition;
    }
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(position);
      }, 300);
    });
  },
  routes,
});

export default router;
