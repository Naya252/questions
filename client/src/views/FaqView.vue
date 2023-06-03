<template>
  <v-container class="mx-auto px-0" style="max-width: 1200px">
    <v-row class="ma-0">
      <v-col cols="12" class="pb-5 pt-0 pseudocontainer mt-5 px-0" align-center>
        <h1 class="noBreak" style="font-size: 2em; line-height: 110%">Anna</h1>

        <h2
          class="noBreak"
          style="font-size: 2em; line-height: 110%; color: #0097a7"
        >
          Frontend developer
        </h2>
      </v-col>
      <v-col cols="12" class="pb-5 pt-0 pseudocontainer mt-5 px-0">
        <v-row
          justify="space-around"
          class="mb-5 ma-0"
          v-for="(faq, i) in faqs"
          :key="i"
        >
          <v-col cols="12" sm="3" style="">
            <h3
              class="text-left"
              style="
                font-weight: normal;
                font-size: 1.5em;
                border-left: 3px solid #0097a7;
                padding-top: 5px;
                padding-left: 5px;
              "
            >
              {{ faq.topic }}
            </h3>
          </v-col>
          <v-col cols="12" sm="9">
            <v-row class="ma-0" v-for="(ask, i) in faq.asks" :key="i">
              <v-col cols="12" class="py-0">
                <v-list-group
                  style="border-top: 1px solid lightgrey"
                  color="#0097A7"
                  :id="ask.id"
                >
                  <template v-slot:activator>
                    <v-list-item-title
                      class="pb-2 pt-1"
                      v-html="ask.question"
                      style="
                        font-size: inherit;
                        font-family: inherit;
                        white-space: pre-line;
                        text-align: left;
                        font-weight: 400;
                      "
                    >
                    </v-list-item-title>
                  </template>
                  <v-list-item style="">
                    <div
                      class="mb-5"
                      v-html="ask.answer"
                      style="
                        font-size: inherit;
                        font-family: inherit;
                        text-align: justify;
                        padding-top: 3px;
                        margin-left: 10px;
                      "
                    ></div>
                  </v-list-item>
                </v-list-group>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'FaqView',
  components: {},
  data: () => ({
    faqs: [
      {
        topic: 'Personal information',
        asks: [
          { id: 0, question: 'Address', answer: 'Saint Petersburg, Russia' },
          { id: 1, question: 'Email', answer: 'naya252naya@gmail.com' },
          {
            id: 2,
            question: 'LinkedIn',
            answer: `<a href="hhttps://www.linkedin.com/in/anna-sch-899217203/" target="_blank">Link on LinkedIn</a>`,
          },
          {
            id: 3,
            question: 'Github',
            answer: `<a href="https://github.com/Naya252" target="_blank">Link on Github</a>`,
          },
        ],
      },
      {
        topic: 'Work Experience',
        asks: [
          {
            id: 4,
            question: `<p class="my-2">Frontend developer (Vue)</p> <span style="color: #999999; font-size: 0.85em" class="mt-1">May 2020 - Present</span>`,
            answer: `<ul style="color: #0097a7">
                            <li ><span style="color: #212229">Development of a large B2B product with a complex interface.</span></li>
                            <li ><span style="color: #212229">Migration of the project to Vue.</span></li>
                            <li ><span style="color: #212229">Writing cross-browser components.</span></li>
                            <li ><span style="color: #212229">Development of new and improvement of existing functionality.</span></li>
                            <li ><span style="color: #212229">Creating layouts in Figma for some pages.</span></li>
                          
                        </ul>`,
          },
          {
            id: 5,
            question: `<p class="my-2">SEO specialist</p> <span style="color: #999999; font-size: 0.85em" class="mt-1">February 2020 - May 2020</span>`,
            answer: `<ul style="color: #0097a7">
                            <li ><span style="color: #212229">Develop research on targeted keywords.</span></li>
                            <li ><span style="color: #212229">Authoring clear and concise content with a focus on ranking for search and/or performing in paid search campaigns.</span></li>
                            <li ><span style="color: #212229">Implement SEO strategies to improve a website's organic rankings to grow site traffic.</span></li>
                          
                          
                        </ul>`,
          },
        ],
      },
      {
        topic: 'Education',
        asks: [
          {
            id: 6,
            question: 'ITMO University',
            answer:
              '<p class="mb-2">Web Developer (Node.js)</p><p class="mb-2">Professional retraining</p><p style="font-size: 0.85em">2019-2020</p>',
          },
          {
            id: 7,
            question:
              'Saint-Petersburg State University of Industrial Technologies and Design',
            answer:
              '<p class="mb-2">Economics and management at the enterprise</p><p style="font-size: 0.85em">2010-2016</p>',
          },
        ],
      },
      {
        topic: 'Skills',
        asks: [
          {
            id: 8,
            question: 'Hard skills',
            answer: `<ul style="color: #0097a7">
                            <li ><span style="color: #212229">Vue</span></li>
                            <li ><span style="color: #212229">Vuex</span></li>
                            <li ><span style="color: #212229">Vuetify</li>
                            <li ><span style="color: #212229">JavaScript</li>
                            <li ><span style="color: #212229">HTML</li>
                            <li ><span style="color: #212229">CSS</li>
                            <li ><span style="color: #212229">SCSS</li>
                            <li ><span style="color: #212229">Git</li>
                            <li ><span style="color: #212229">Node.js</li>
                            <li ><span style="color: #212229">MongoDB</li>
                            <li ><span style="color: #212229">Mongoose</li>
                            <li ><span style="color: #212229">Express</li>
                        </ul>`,
          },
          {
            id: 9,
            question: 'Soft skills',
            answer: `<ul style="color: #0097a7">
                            <li ><span style="color: #212229">Teamwork</span></li>
                            <li ><span style="color: #212229">Patience</span></li>
                            <li ><span style="color: #212229">Adaptability</li>
                            <li ><span style="color: #212229">Problem-solving</li>
                            <li ><span style="color: #212229">Critical thinking</li>
                            <li ><span style="color: #212229">Creativity</li>
                        </ul>`,
          },
        ],
      },
    ],
  }),
  mounted: function () {
    if (this.$route.hash) {
      let element = document.getElementById(this.$route.hash.slice(1));
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
        element.__vue__.click();
      }
    }
  },
  created() {},
  computed: {},
  methods: {},
};
</script>
