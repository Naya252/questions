export default {
  state: () => ({
    drawer: false,
    menuItems: [
      {
        icon: 'mdi-apps',
        title: 'Ask',
        link: '/',
      },
      {
        icon: 'mdi-comment-question-outline',
        title: 'Questions',
        link: '/questions',
      },
      {
        icon: 'mdi-account-question-outline',
        title: 'About me',
        link: '/about',
      },
    ],
  }),
  mutations: {
    TOGGLE_DRAWER(state, value) {
      state.drawer = value;
    },
  },
  getters: {
    GET_MENU_ITEMS: (state) => {
      return state.menuItems;
    },
    GET_DRAWER: (state) => {
      return state.drawer;
    },
  },
};
