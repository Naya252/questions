<template>
  <v-footer dark padless>
    <v-card class="flex pa-0 mx-auto" flat tile max-width="1920px">
      <v-card-title class="py-1" style="font-size: 0.88rem">
        &copy;2022 <strong class="ml-2">N_&_N</strong>

        <v-spacer></v-spacer>

        <v-btn
          v-for="(icon, i) in icons"
          :key="i"
          :to="icon.link"
          class="mx-2"
          dark
          icon
        >
          <v-icon size="24px">
            {{ icon.img }}
          </v-icon>
        </v-btn>
        <img
          style="max-height: 30px"
          class="logo mr-2"
          alt="Logo"
          :src="require('../../assets/logo4.svg')"
        />
      </v-card-title>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  name: 'MenuFooter',
  data() {
    return {
      icons: [
        // {
        //   img: 'mdi-email-open',
        //   link: '/feedback',
        // },
      ],
      padless: true,
    };
  },
  components: {},
  async mounted() {},
  methods: {},
  computed: {},
  watch: {},
};
</script>
