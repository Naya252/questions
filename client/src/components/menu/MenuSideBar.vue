<template>
  <v-navigation-drawer
    :value="GET_DRAWER"
    app
    left
    disable-resize-watcher
    temporary
    dark
    @input="TOGGLE_DRAWER"
  >
    <v-list>
      <v-list-item
        @click.stop="TOGGLE_DRAWER(false)"
        v-for="item in GET_MENU_ITEMS"
        :key="item.title"
        :to="item.link"
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content class="menuText">
          <v-list-item-title v-text="item.title" class="menuText" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: 'MenuSideBar',
  data: () => ({
    miniVariant: false,
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
