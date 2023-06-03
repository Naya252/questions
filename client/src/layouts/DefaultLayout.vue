<template>
  <v-app light>
    <MenuSideBar />

    <MenuAppBar />

    <v-main light>
      <router-view />
    </v-main>

    <MenuFooter />

    <Preloader />
  </v-app>
</template>

<script>
import MenuAppBar from '../components/menu/MenuAppBar.vue';
import MenuSideBar from '../components/menu/MenuSideBar.vue';
import MenuFooter from '../components/menu/MenuFooter.vue';

import Preloader from '../components/PreloaderComponent.vue';

import { mapGetters } from 'vuex';

export default {
  data() {
    return {};
  },
  components: {
    MenuAppBar,
    MenuSideBar,
    MenuFooter,
    Preloader,
  },
  async mounted() {},
  methods: {},
  computed: {
    ...mapGetters(['LOADER_SHOW']),
    // error() {
    //   return this.$store.getters.error;
    // },
  },
  watch: {
    // error(value) {
    //   this.$message.error(value.response.data);
    // },
  },
};
</script>

<style lang="scss">
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0 !important;
}
body {
  box-sizing: border-box;
}
</style>
