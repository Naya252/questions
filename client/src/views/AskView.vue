<template>
  <v-container
    column
    justify-center
    align-center
    fluid
    class="pa-0"
    style="height: 100%"
  >
    <v-flex xs12 style="height: 100vh">
      <div class="introT" style="height: 100vh; width: 100vw">
        <div class="videoPly" style="width: 100vw">
          <video
            style="width: 100vw; height: 100vh"
            class="videoMedia"
            :src="require('../assets/video/video.mp4')"
            autoplay
            muted
            loop
            playsinline
            :poster="require('../assets/img/mainFon2.png')"
          ></video>
        </div>
        <div class="introT__content">
          <div class="introT__container pb-15">
            <h1 class="intro__title mb-0 noBreak" style="line-height: 110%">
              Ask me
            </h1>
            <p class="intro__text noBreak mb-0 mt-2">
              Find out the most interesting. Ask questions and get answers on
              any topic!
            </p>
            <v-row justify="center" class="ma-0">
              <v-col cols="12" class="pb-0 pt-0 pseudocontainer mr-0 ml-0">
                <v-card elevation="12" class="pb-0 pt-0 mt-5">
                  <v-form
                    ref="form"
                    v-model="valid"
                    lazy-validation
                    method="post"
                    action="/"
                    id="form"
                    style="background-color: #f0f2f2; color: #f3e5f5"
                    class="pt-0"
                  >
                    <div
                      style="
                        display: flex;
                        align-items: center;
                        justify-content: space-around;
                      "
                    >
                      <v-textarea
                        required
                        v-model.trim="controls.text"
                        :rules="rules.bodyRules"
                        style="
                          width: 90%;
                          background-color: white;
                          color: #373737;
                          border-radius: 0.3em;
                        "
                        class="textarea_body mt-1 mb-1 ml-1 mr-2"
                        placeholder="write a question*"
                        rows="1"
                        auto-grow
                        solo
                        flat
                      ></v-textarea>

                      <v-btn
                        class="mb-0 pb-0 ml-2 mr-2 white--text"
                        @click="detailVisible = !detailVisible"
                        color="#0097A7"
                      >
                        <v-icon>mdi-account-question</v-icon>
                      </v-btn>
                    </div>

                    <v-divider></v-divider>

                    <v-card-text
                      class="pb-0"
                      style="min-height: 130px"
                      v-show="detailVisible"
                    >
                      <v-row class="ma-0">
                        <v-col
                          cols="12"
                          sm="12"
                          class="pa-0"
                          style="margin-bottom: 15px"
                        >
                          <v-text-field
                            dense
                            label="Title"
                            name="title"
                            type="text"
                            :counter="50"
                            v-model.trim="controls.title"
                            :rules="controls.title ? rules.titleRules : []"
                            autocomplete="off"
                            color="#0097A7"
                          ></v-text-field>
                          <v-text-field
                            dense
                            label="Name"
                            name="name"
                            type="text"
                            :counter="30"
                            v-model.trim="controls.name"
                            :rules="controls.name ? rules.nameRules : []"
                            autocomplete="off"
                            color="#0097A7"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="12" class="py-0">
                          <v-btn
                            :disabled="disabled"
                            block
                            style="margin-top: 0"
                            color="#0097A7"
                            class="white--text btnQuest mb-5"
                            @click="validate()"
                            >Send</v-btn
                          >
                        </v-col>
                      </v-row>
                    </v-card-text>
                  </v-form>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </div>
      </div>
    </v-flex>
    <v-alert
      v-model="alert"
      dismissible
      :color="colorAlert"
      border="top"
      colored-border
      :type="typeAlert"
      elevation="2"
      style="
        position: absolute;
        top: 30px;
        right: calc(50% - 150px);
        width: 300px;
        z-index: 10;
      "
    >
      {{ textAlert }}
    </v-alert>
  </v-container>
</template>

<script>
import QuestionService from '../services/QuestionService';

import { mask } from 'vue-the-mask';

export default {
  name: 'AskView',
  directives: {
    mask,
  },
  data: () => ({
    disabled: false,
    alert: false,
    typeAlert: 'info',
    textAlert: '',
    colorAlert: '#0097A7',
    detailVisible: false,
    valid: true,
    mask: '+7(###)-###-##-##',
    rules: {
      bodyRules: [
        (v) => !!v || 'Required',
        (v) => (v && v.trim().length !== 0) || 'Required',
      ],
      titleRules: [
        (v) => v.trim().length <= 50 || 'Name must be less than 50 characters',
      ],
      nameRules: [
        (v) => v.trim().length <= 30 || 'Name must be less than 30 characters',
      ],
    },

    checkbox: true,
    controls: {
      name: '',
      title: '',
      text: '',
    },
  }),
  methods: {
    async validate() {
      this.disabled = true;
      if (this.$refs.form.validate()) {
        const formData = {
          name: this.controls.name,
          text: this.controls.text,
          title: this.controls.title,
        };
        try {
          await QuestionService.insertQuestion(formData).then(() => {
            this.textAlert = 'Question sent successfully';
            this.typeAlert = 'info';
            this.colorAlert = '#0097A7';
            this.alert = true;
          });
          this.$refs.form.reset();
          this.detailVisible = false;
          this.disabled = false;
        } catch (e) {
          console.log(e);
        }
      } else {
        this.textAlert = 'Fill the form';
        this.typeAlert = 'error';
        this.colorAlert = '#B71C1C';
        this.alert = true;
        this.disabled = false;
      }
    },
    closeAlert() {
      this.alert = false;
      this.textAlert = '';
    },
  },
  components: {},
  computed: {},
  watch: {
    alert() {
      if (this.alert) {
        setTimeout(this.closeAlert, 3000);
      }
    },
  },
};
</script>

<style lang="scss">
.introT {
  overflow: visible;
}

.introT:after {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
}

.videoPly {
  -ms-flex-align: center;
  align-items: center;
  background: linear-gradient(to top, #525252, #333);
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  height: calc(100vh);
  min-height: 300px;
  // margin-top: 65px;
  max-height: calc(100vh);
  overflow: hidden;
  position: relative;
  width: 100%;

  background-position: center;
  -o-object-fit: cover;
  object-fit: cover;
  -o-object-position: 50% 50%;
  object-position: 50% 50%;
  -webkit-filter: blur(0);
  filter: blur(0);
  height: 100%;
  transition: -webkit-filter 0.35s ease-in-out;
  transition: filter 0.35s ease-in-out;
  transition: filter 0.35s ease-in-out, -webkit-filter 0.35s ease-in-out;
  width: 100%;
}

.videoPly {
  height: 100vh;
  overflow: hidden;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}

.videoMedia {
  display: block;
  overflow: hidden;
}

@supports (object-fit: cover) {
  .videoMedia {
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    object-fit: cover;
  }
}

.introT__btn {
  animation: pulsing 3s infinite;
}

@keyframes pulsing {
  0% {
    -webkit-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
  }
  50% {
    -webkit-transform: scale(0.8, 0.8);
    transform: scale(0.8, 0.8);
  }
  100% {
    -webkit-transform: scale(1.2, 1.2);
    transform: scale(1.2, 1.2);
  }
}

.introT__content {
  -ms-flex-align: center;
  align-items: center;
  color: #fff;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  height: 100vh;
  position: relative;
  text-align: center;
  width: 100%;
  z-index: 3;
}

.introT__container {
  text-align: center;
  max-width: 320px;
}

@media screen and (min-width: 768px) {
  .introT__container {
    max-width: 600px;
  }
}

.intro__title {
  font-size: 2em;
}
.intro__text {
  font-size: 1em;
  line-height: 90%;
}

@media screen and (min-width: 768px) {
  .intro__title {
    font-size: 4.5em;
  }
  .intro__text {
    font-size: 1.5em;
    line-height: 90%;
  }
}

.btnQuest {
  margin-top: 0;
}

@media screen and (max-width: 768px) {
  .btnQuest {
    margin-top: 10px;
    margin-bottom: 10px;
  }
}

.textarea_body .v-input__slot::before {
  display: none;
}

.textarea_body .v-text-field__details {
  display: none;
}

.textarea_body .v-input__slot {
  margin-bottom: 0;
}

.textarea_body textarea {
  max-height: 80px !important;
  overflow: auto !important;
}

.textarea_body.error--text {
  outline: 1px solid red;
}
</style>
