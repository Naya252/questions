<template>
  <v-app-bar dark :clipped-left="clipped" fixed app dense class="pa-0">
    <v-app-bar-nav-icon
      @click.stop="TOGGLE_DRAWER(true)"
      class="ml-2 menuLeft"
    />

    <v-toolbar-title class="pl-0">
      <v-img
        max-height="40"
        contain
        alt="Logo"
        :src="require('../../assets/logo6.svg')"
      />
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="menuTop">
      <v-btn text v-for="(item, i) in GET_MENU_ITEMS" :key="i" :to="item.link">
        <v-icon left dark>{{ item.icon }}</v-icon>
        <div class="menuText">{{ item.title }}</div>
      </v-btn>
    </v-toolbar-items>
  </v-app-bar>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MenuAppBar',
  data: () => ({
    clipped: false,
  }),
  computed: {
    ...mapGetters(['GET_MENU_ITEMS', 'GET_DRAWER']),
  },
  methods: {
    ...mapMutations(['TOGGLE_DRAWER']),
  },
};
</script>

<style lang="scss" scoped>
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0 !important;
}

.menuTop {
  display: none !important;
}

.menuLeft {
  display: block !important;
}

@media screen and (min-width: 768px) {
  .menuTop {
    display: block !important;
  }
  .menuLeft {
    display: none !important;
  }
}
</style>
