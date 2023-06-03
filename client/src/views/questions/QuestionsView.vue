<template>
  <v-container class="mx-auto" style="max-width: 800px">
    <v-row class="ma-0">
      <v-col
        cols="12"
        class="pb-5 pt-0 pseudocontainer mt-5 mr-0 ml-0 align-center px-0"
        align-center
      >
        <h1 class="TitlePages noBreak">Questions</h1>
      </v-col>
      <!-- Search -->
      <v-col
        cols="12"
        class="pb-5 pt-0 pseudocontainer mt-5 align-center mx-auto px-0"
        align-center
      >
        <v-toolbar dark flat style="border-radius: 0.2em" color="#49494a">
          <v-text-field
            class="mx-2 mx-sm-12"
            flat
            hide-details
            label="search"
            prepend-inner-icon="mdi-magnify"
            solo-inverted
            v-model="search"
            clearable
            color="#0097A7"
          ></v-text-field>
        </v-toolbar>
      </v-col>

      <!-- All questions-->
      <v-col cols="12" class="mx-auto px-0">
        <v-card flat>
          <v-tabs
            v-model="tab"
            background-color="#2b2b2b"
            centered
            dark
            icons-and-text
          >
            <v-tabs-slider></v-tabs-slider>

            <v-tab href="#tab-1" @click="SET_CURRENT_PAGE(1)">
              <span class="tabTitleQ">All</span>
              <v-icon class="mb-2">mdi-frequently-asked-questions</v-icon>
            </v-tab>

            <v-tab href="#tab-2" @click="SET_CURRENT_PAGE(1)">
              <span class="tabTitleQ">Target</span>
              <v-icon class="mb-2">mdi-crosshairs-question</v-icon>
            </v-tab>

            <v-tab
              href="#tab-3"
              @click="SET_CURRENT_PAGE(1)"
              class="pr-0 pr-sm-4 pl-0 pl-sm-4"
            >
              <span class="tabTitleQ">Answered</span>
              <v-icon class="mb-2">mdi-comment-text-multiple-outline</v-icon>
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab">
            <v-tab-item v-for="i in 3" :key="i" :value="'tab-' + i">
              <!-- Questions -->
              <v-row class="ma-0">
                <v-col cols="12" class="order-1 order-md-0 mx-auto px-0">
                  <QuestionComponent
                    v-for="question in filtredQuestions"
                    :key="question._id"
                    :questionData="question"
                  />

                  <template v-if="filtredQuestions == 0">
                    <h3 style="color: grey; text-align: center" class="noBreak">
                      Nothing found
                    </h3>
                  </template>
                  <!-- {{ filtredQuestions.length }} -->
                </v-col>
              </v-row>

              <!-- Pagination -->
              <v-container v-if="paginationLength > 1">
                <v-row justify="center" class="ma-0">
                  <v-col cols="8">
                    <v-container class="max-width">
                      <v-pagination
                        v-model="currentPage"
                        class="my-4"
                        :length="paginationLength"
                        :total-visible="5"
                        :page="GET_CURRENT_PAGE"
                        color="#0097A7"
                      ></v-pagination>
                    </v-container>
                  </v-col>
                </v-row>
              </v-container>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuestionService from '../../services/QuestionService';
import QuestionComponent from '@/components/QuestionComponent.vue';

import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'QuestionsView',
  components: {
    QuestionComponent,
  },
  data: () => ({
    filtredQuestionsLength: '',
    allItems: [],
  }),
  created() {
    this.fetchData();
  },
  computed: {
    ...mapGetters(['LOADER_SHOW', 'GET_TAB', 'GET_SEARCH', 'GET_CURRENT_PAGE']),
    tab: {
      get() {
        return this.GET_TAB;
      },
      set(value) {
        this.SET_TAB(value);
      },
    },

    currentPage: {
      get() {
        return this.GET_CURRENT_PAGE;
      },
      set(value) {
        this.SET_CURRENT_PAGE(value);
      },
    },

    search: {
      get() {
        return this.GET_SEARCH;
      },
      set(value) {
        this.SET_SEARCH(value);
      },
    },

    paginationLength() {
      if (this.filtredQuestionsLength < 5) {
        return 1;
      } else {
        return Math.ceil(this.filtredQuestionsLength / 5);
      }
    },

    filtredQuestions() {
      let filtredQuestions = this.allItems.filter((q) => {
        if (this.GET_TAB === 'tab-1') {
          return q;
        } else if (this.GET_TAB === 'tab-2') {
          return q.status == 2;
        } else {
          return q.status == 3;
        }
      });

      let search = this.GET_SEARCH;
      if (search) {
        search = search.trim().toLowerCase();
        filtredQuestions = filtredQuestions.filter(function (question) {
          if (
            question.text.toLowerCase().includes(search.toLowerCase()) ||
            (question.title &&
              question.title.toLowerCase().includes(search.toLowerCase())) ||
            (question.name &&
              question.name.toLowerCase().includes(search.toLowerCase()))
          ) {
            return question;
          }
        });
      }
      this.changeLength(filtredQuestions.length);

      filtredQuestions = filtredQuestions.filter((q, index) => {
        if (this.currentPage === 1) {
          return (
            index >= 0 &&
            index < this.currentPage * 5 &&
            index < filtredQuestions.length
          );
        } else {
          return (
            index >= (this.currentPage - 1) * 5 &&
            index < this.currentPage * 5 &&
            index < filtredQuestions.length
          );
        }
      });

      return filtredQuestions;
    },
  },
  methods: {
    ...mapMutations([
      'LOADER_INCREMENT',
      'LOADER_DECREMENT',
      'GET_LIKES',
      'GET_DISLIKES',
      'SET_TAB',
      'SET_SEARCH',
      'SET_CURRENT_PAGE',
    ]),
    async fetchData() {
      try {
        this.LOADER_INCREMENT();
        this.GET_LIKES();
        this.GET_DISLIKES();
        let data = await QuestionService.getQuestions();
        this.allItems = data.reverse();
        this.LOADER_DECREMENT();
      } catch (err) {
        console.log(err);
      }
    },
    changeLength(val) {
      this.filtredQuestionsLength = val;
    },
  },
};
</script>
