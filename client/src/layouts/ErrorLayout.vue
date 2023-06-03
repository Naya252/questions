<template>
  <v-app dark>
    <MenuSideBar />

    <MenuAppBar />
    <v-main dark style="background: #000">
      <v-container fluid class="pa-0">
        <v-row class="ma-0">
          <div class="center" style>
            <h1
              class="center__text glitch is-glitching"
              data-text="404 Not Found"
            >
              {{ pageNotFound }}
            </h1>
          </div>
        </v-row>
      </v-container>
    </v-main>

    <MenuFooter />
  </v-app>
</template>

<script>
import MenuAppBar from '../components/menu/MenuAppBar.vue';
import MenuSideBar from '../components/menu/MenuSideBar.vue';
import MenuFooter from '../components/menu/MenuFooter.vue';

export default {
  layout: 'error',
  props: {},
  data() {
    return {
      pageNotFound: '404 Not Found',
      clipped: false,
      fixed: false,
      miniVariant: false,
      drawer: false,
    };
  },
  components: {
    MenuAppBar,
    MenuSideBar,
    MenuFooter,
  },
};
</script>

<style lang="scss">
@import '../sass/variables.scss';

.center {
  display: flex;
  width: 100vw;
  height: 100vh;
  background: {
    color: black;
    image: url('../assets/img/bet.jpg');
    repeat: no-repeat;
    position: center;
    size: cover;
  }
}

.center__text {
  margin: 2em auto 0;
  font-size: 2.5em;
}

@media screen and (min-width: 630px) {
  .center__text {
    font-size: 5em;
  }
}

.glitch {
  position: relative;
  color: white;
  mix-blend-mode: lighten;

  &:before,
  &:after {
    content: attr(data-text);
    position: absolute;
    width: 100%;
    clip: rect(0, 0, 0, 0);
  }

  &:before {
    left: -1px;
    text-shadow: 1px 0 rgba(red, 0.7);
  }

  &:after {
    left: 1px;
    text-shadow: -1px 0 rgba(blue, 0.7);
  }

  //   &:hover {
  &:before {
    text-shadow: 4px 0 rgba(red, 0.7);
    animation: glitch-loop-1 0.8s infinite ease-in-out alternate-reverse;
  }
  &:after {
    text-shadow: -5px 0 rgba(blue, 0.7);
    animation: glitch-loop-2 0.8s infinite ease-in-out alternate-reverse;
  }
  //   }
}

@keyframes glitch-loop-1 {
  0% {
    clip: rect(36px, 9999px, 9px, 0);
  }
  25% {
    clip: rect(25px, 9999px, 99px, 0);
  }
  50% {
    clip: rect(50px, 9999px, 102px, 0);
  }
  75% {
    clip: rect(30px, 9999px, 92px, 0);
  }
  100% {
    clip: rect(91px, 9999px, 98px, 0);
  }
}

@keyframes glitch-loop-2 {
  0% {
    top: -1px;
    left: 1px;
    clip: rect(65px, 9999px, 119px, 0);
  }
  25% {
    top: -6px;
    left: 4px;
    clip: rect(79px, 9999px, 19px, 0);
  }
  50% {
    top: -3px;
    left: 2px;
    clip: rect(68px, 9999px, 11px, 0);
  }
  75% {
    top: 0px;
    left: -4px;
    clip: rect(95px, 9999px, 53px, 0);
  }
  100% {
    top: -1px;
    left: -1px;
    clip: rect(31px, 9999px, 149px, 0);
  }
}
</style>
