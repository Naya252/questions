<template>
  <v-theme-provider root>
    <div>
      <component :is="layout">
        <router-view />
      </component>

      <!-- <Preloader /> -->
    </div>
  </v-theme-provider>
</template>

<script>
import DefaultLayout from './layouts/DefaultLayout.vue';
import ErrorLayout from './layouts/ErrorLayout.vue';
import AdminLayout from './layouts/AdminLayout.vue';

export default {
  name: 'App',
  components: {
    DefaultLayout,
    ErrorLayout,
    AdminLayout,
  },

  data: () => ({
    //
  }),
  computed: {
    layout() {
      return (
        ((this.$route.meta && this.$route.meta.layout) || 'default') + '-layout'
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import '~/src/sass/variables.scss';
</style>
