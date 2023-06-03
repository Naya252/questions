export default {
  state: () => ({
    questionsLikes: [],
    questionsDislikes: [],
    tab: 'tab-1',
    search: '',
    currentPage: 1,

    tabItem: 0,
    tabItemIndex: 0,
  }),
  mutations: {
    GET_LIKES(state) {
      state.questionsLikes = localStorage.getItem('questionsLikes')
        ? JSON.parse(localStorage.getItem('questionsLikes'))
        : [];
    },
    GET_DISLIKES(state) {
      state.questionsDislikes = localStorage.getItem('questionsDislikes')
        ? JSON.parse(localStorage.getItem('questionsDislikes'))
        : [];
    },

    SET_LIKES(state, obj) {
      if (obj.isLike) {
        state.questionsLikes.push(obj.id);
      } else {
        let index = state.questionsLikes.indexOf(obj.id);
        state.questionsLikes.splice(index, 1);
      }
      localStorage.setItem(
        'questionsLikes',
        JSON.stringify(state.questionsLikes),
      );
    },
    SET_DISLIKES(state, obj) {
      if (obj.isDislike) {
        state.questionsDislikes.push(obj.id);
      } else {
        let index = state.questionsDislikes.indexOf(obj.id);
        state.questionsDislikes.splice(index, 1);
      }
      localStorage.setItem(
        'questionsDislikes',
        JSON.stringify(state.questionsDislikes),
      );
    },
    SET_TAB(state, tab) {
      state.tab = tab;
    },
    SET_SEARCH(state, val) {
      state.search = val;
    },
    SET_CURRENT_PAGE(state, val) {
      state.currentPage = val;
    },
  },
  getters: {
    RETURN_LIKES: (state) => {
      return state.questionsLikes;
    },
    RETURN_DISLIKES: (state) => {
      return state.questionsDislikes;
    },
    GET_TAB: (state) => {
      return state.tab;
    },
    GET_SEARCH: (state) => {
      return state.search;
    },
    GET_CURRENT_PAGE: (state) => {
      return state.currentPage;
    },
  },
};
