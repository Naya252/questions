<template>
  <v-container class="mx-auto" style="max-width: 800px">
    <v-row class="ma-0">
      <v-col
        cols="12"
        class="pb-5 pt-0 pseudocontainer mt-5 mr-0 ml-0 align-center px-0"
        align-center
      >
        <h1 class="TitlePages noBreak mb-7">{{ title }}</h1>

        <v-card flat style="width: 100%">
          <v-row
            style="background: #2b2b2b; color: #ccc"
            class="py-5 ma-0 rowRelative"
          >
            <v-col cols="2" sm="1">
              <v-btn
                icon
                color="#BDBDBD"
                id="btnPrew"
                class="btnPrew"
                @click="$router.go(-1)"
              >
                <v-icon id="backBtn" class="backBtn"
                  >mdi-arrow-left-circle-outline</v-icon
                >
              </v-btn>
            </v-col>
            <v-col cols="10" sm="11" class="d-flex justify-end py-0">
              author:
              {{ name }},
              {{ new Date(question.createdAt).toLocaleDateString() }}
            </v-col>
          </v-row>

          <v-divider></v-divider>

          <!-- Question -->
          <v-card elevation="2" class="pb-5 pt-1 mt-1" style="min-height: 6em">
            <v-card-text>
              <pre
                style="
                  font-size: inherit;
                  font-family: inherit;
                  white-space: pre-wrap;
                  text-align: justify;
                "
                >{{ question.text }}</pre
              >
              <br />
            </v-card-text>
          </v-card>

          <v-row class="ma-0 pt-5">
            <v-col cols="6" class="px-0 text-left">
              <v-btn
                @click="changeLike"
                small
                outlined
                color="#0097A7"
                style="font-size: 0.7em"
                id="btnA"
                class="up mr-4 mb-5"
              >
                <span style="margin-right: 10px">{{ question.likes }}</span>
                <v-icon v-if="isLike" class="mr-1" style="font-size: 1.5em"
                  >mdi-thumb-up
                </v-icon>
                <v-icon v-else class="mr-1" style="font-size: 1.5em"
                  >mdi-thumb-up-outline</v-icon
                >
              </v-btn>

              <v-btn
                @click="changeDislike"
                small
                outlined
                color="#f08080"
                style="font-size: 0.7em"
                id="btnA"
                class="down mb-5"
              >
                <span style="margin-right: 10px">{{ question.dislikes }}</span>

                <v-icon v-if="isDislike" class="mr-1" style="font-size: 1.5em"
                  >mdi-thumb-down</v-icon
                >
                <v-icon v-else class="mr-1" style="font-size: 1.5em"
                  >mdi-thumb-down-outline</v-icon
                >
              </v-btn>
            </v-col>
            <v-col cols="6" class="pb-0">
              <div class="d-flex justify-end align-center">
                <v-icon class="mr-1 view" color="#0097A7" style="font-size: 1em"
                  >mdi-eye</v-icon
                >
                <p class="view mb-0" style="font-size: 0.8em">
                  {{ question.views }}
                </p>
              </div>
            </v-col>
          </v-row>

          <!-- Answer -->
          <v-row
            justify="center"
            class="ma-0 workQMsg"
            :class="{
              displayB:
                (question.status == 3 && question.comment) ||
                (question.status == 1 && question.comment),
            }"
          >
            <v-col class="pa-0">
              <v-card
                elevation="2"
                class="pb-5 pt-1 mt-1"
                style="min-height: 6em; background: #fdfffc"
              >
                <v-card-text>
                  <div
                    v-html="question.comment"
                    style="
                      font-size: inherit;
                      font-family: inherit;
                      text-align: justify;
                    "
                  ></div>

                  <p style="padding-top: 15px; text-align: left">
                    Regards, Anna
                  </p>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import QuestionService from '../../services/QuestionService';
import { mapGetters, mapMutations } from 'vuex';
import likes from '../../mixins/likes';

export default {
  mixins: [likes],

  components: {},

  data() {
    return {
      question: {},

      isLike: false,
      isDislike: false,
    };
  },
  created() {
    this.fetchData();
  },

  computed: {
    ...mapGetters(['LOADER_SHOW']),
    title() {
      return this.question.title ? this.question.title : 'Question';
    },
    name() {
      return this.question.name ? this.question.name : 'anonymous';
    },
    answerAt() {
      return this.question.answerAt
        ? new Date(question.answerAt).toLocaleDateString()
        : '';
    },
  },

  methods: {
    ...mapMutations([
      'LOADER_INCREMENT',
      'LOADER_DECREMENT',
      'GET_LIKES',
      'GET_DISLIKES',
    ]),
    async fetchData() {
      try {
        this.LOADER_INCREMENT();
        let data = await QuestionService.getQuestionById(this.$route.params.id);
        this.question = data[0];
        this.addView();
        this.getLike();
        this.getDislike();
        this.LOADER_DECREMENT();
      } catch (err) {
        this.error = err.message;
      }
    },
    async addView() {
      this.question = {
        ...this.question,
        views: ++this.question.views,
      };

      await QuestionService.addView({
        _id: this.question._id,
        views: this.question.views,
      });
    },
  },
};
</script>

<style lang="scss">
.rowRelative {
  position: relative;
}

.btnPrew {
  position: absolute;
  top: 20%;
  left: 2%;
}

.resolvedQMsg,
.workQMsg {
  text-align: right;
  display: none;
}

.displayB {
  display: block;
}

#arrowLeft:hover,
#arrowLeft:focus,
#arrowLeft:active,
.false {
  background: #212121 !important;
}

.displayB {
  display: block;
}

.display {
  display: none;
}

@media screen and (min-width: 768px) {
  .display {
    display: inline-block;
  }
}
</style>
