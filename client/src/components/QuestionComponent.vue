<template>
  <v-row class="ma-0">
    <v-col cols="12" sm="3" md="2" class="pt-0 pt-sm-4 order-1 order-sm-0">
      <v-card
        elevation="2"
        v-bind:class="{ resolvedQ: question.status == 3 }"
        class="pb-5 pt-1 mt-1 cardMsg"
        style
      >
        <v-list-item>
          <v-btn icon @click="changeLike">
            <v-icon v-if="isLike" color="#0097A7">mdi-thumb-up </v-icon>
            <v-icon v-else>mdi-thumb-up-outline </v-icon>
          </v-btn>

          <v-list-item-content>
            <v-list-item-title>{{ question.likes }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item>
          <v-btn icon @click="changeDislike">
            <v-icon v-if="isDislike" color="#f08080">mdi-thumb-down</v-icon>
            <v-icon v-else>mdi-thumb-down-outline</v-icon>
          </v-btn>

          <v-list-item-content>
            <v-list-item-title>{{ question.dislikes }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>

    <v-col
      cols="12"
      sm="9"
      md="10"
      class="mb-1 pb-0 pt-sm-4 order-0 order-sm-1 text-left"
    >
      <v-card
        :elevation="isHover ? '5' : '2'"
        class="pb-1 pt-1 mt-1"
        style="min-height: 6em; transition: all 0.3s ease"
        :to="{ path: `/questions/${question._id}` }"
        @mouseover="isHover = true"
        @mouseleave="isHover = false"
      >
        <v-card-text>
          <!-- Title -->
          <div
            v-bind:class="{
              displayB:
                question.status == 0 ||
                question.status == 2 ||
                question.status == 3,
            }"
            class="resolvedQMsg mb-2"
            style="text-align: left"
          >
            <span class="mr-2">title:</span>
            <span>{{ question.title ? question.title : '-----' }}</span>
          </div>

          <pre
            style="
              font-size: inherit;
              font-family: inherit;
              white-space: pre-wrap;
            ">{{slicedText(question.text)}} <span style="color: #0097A7; margin-left: .5em;">&raquo;&raquo;&raquo;</span>
          </pre>

          <v-row
            class="ma-0"
            style="display: flex; justify-content: space-between"
          >
            <v-col class="pa-0 col-auto">
              <v-icon class="mr-1 view">mdi-eye</v-icon>
              <span class="view">{{ question.views }}</span>
            </v-col>
            <v-col class="pa-0 col-auto">
              <!-- Target -->
              <div
                v-bind:class="{ displayB: question.status == 2 }"
                class="workQMsg"
              >
                <v-icon style="color: #ff9800">mdi-crosshairs-question</v-icon>
              </div>

              <!-- With comment -->
              <div
                v-bind:class="{ displayB: question.status == 3 }"
                class="workQMsg"
              >
                <v-icon color="#0097A7"
                  >mdi-comment-text-multiple-outline</v-icon
                >
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import likes from '../mixins/likes';

export default {
  name: 'QuestionComponent',
  mixins: [likes],
  props: {
    questionData: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    question: '',
    isHover: false,
    isLike: false,
    isDislike: false,
  }),
  created() {
    this.question = this.questionData;
    this.getLike();
    this.getDislike();
  },
  computed: {},
  methods: {
    slicedText(text) {
      let sliced = text.slice(0, 290);
      if (sliced.length < text.length) {
        sliced = sliced + '...';
      }
      return sliced;
    },
  },
};
</script>

<style lang="scss" scoped>
.cardMsg {
  border-radius: 1em !important;
  position: relative;
  background: rgb(238, 228, 228) !important;
  margin: 0 auto 0 0;
  height: 6em;
  max-width: 6em;
}

@media screen and (min-width: 700px) {
  .cardMsg {
    margin: 0 auto;
  }
}

.cardMsg::after {
  content: '';
  position: absolute;
  right: -20px;
  top: 0;
  border: 20px solid transparent;
  border-left: 20px solid rgb(238, 228, 228);
  border-top: 20px solid rgb(238, 228, 228);
}

.resolvedQMsg {
  text-align: right;
  display: none;
}
.workQMsg {
  text-align: right;
  display: none;
}

.displayB {
  display: block;
}

.view {
  font-size: 0.88em;
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
