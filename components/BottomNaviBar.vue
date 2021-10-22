<template>
  <div
    id="nav"
    :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_front}`"
  >
    <v-row
      class="nav_contents mx-4"
      justify="center"
      align="center"
      style="height: 64px; margin-top: 0%"
    >
      <div
        v-for="(item, i) in btnGroup"
        :key="i"
      >
        <button
          class="nav_btn mx-5"
          @click="$router.push(item.value)"
        >
          <div v-if="path == item.value" class="nav_select_tag" />
          <v-icon
            :size="'28px'"
            :color="path == item.value ? '#93DED2' : '#B7C9E4'"
          >
            {{ item.icon }}
          </v-icon>
          <!--<span class="text-caption">{{ item.name }}</span>-->
        </button>
      </div>

      <button
        class="nav_btn mx-5"
        @click="$router.push('/account/' + 'uid')"
      >
        <div v-if="path == '/account/' + 'uid'" class="nav_select_tag" />
        <v-avatar
          size="28"
          :color="path == '/account/' + 'uid' ? '#93DED2' : '#B7C9E4'"
        />
      </button>

      <v-menu
        top
        offset-y
        nudge-top="24"
        rounded="nomal"
        transition="slide-y-reverse-transition"
        content-class="elevation-3"
        :close-on-content-click="false"
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            size="32"
            class="mx-5"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon size="32" color="#B7C9E4">
              mdi-dots-vertical
            </v-icon>
          </v-btn>
        </template>

        <v-card :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_front">
          <div class="px-4 py-4">
            <v-list-item>
              <v-list-item-title>
                ダークモード
              </v-list-item-title>
              <v-list-item-action>
                <v-switch
                  v-model="isDarkMode"
                  color="blue_lighten2"
                />
              </v-list-item-action>
            </v-list-item>
          </div>
        </v-card>
      </v-menu>
    </v-row>
  </div>
</template>

<script>
import '../assets/icomoon/style.css'

export default {
  data () {
    return {
      btnGroup: [
        { value: '/timeline', name: 'タイムライン', icon: 'icon-homeIcon' },
        { value: '/map', name: 'マップ', icon: 'icon-homeIcon' },
      ],
      isDarkMode: this.$store.state.darkMode.isDarkMode,
    }
  },

  computed: {
    path () {
      return this.$route.path
    },
  },

  watch: {
    isDarkMode (newVal, oldVal) {
      this.$store.dispatch('darkMode/updateIsDarkMode', newVal)
    },
  },
}
</script>

<style>
#nav {
  position: fixed;
  width: 100vw;
  height: 64px;
  bottom: 0%;

  border-radius: 16px 16px 0px 0px;
  box-shadow: 0px 0px 6px 3px #00214D28;

}

.nav_btn {
  position: relative;
  width: 40px;
  height: 64px;
}

.nav_btn .nav_select_tag {
  position: absolute;
  width: 28px;
  height: 4px;
  top: 0%;
  left: 50%;

  transform: translateX(-50%);
  animation: select 0.2s;

  border-radius: 0px 0px 4px 4px;

  background-color: #93DED2;
}

@keyframes select {
  0% {
    height: 0px;
  }
  100% {
    height: 4px;
  }
}
</style>
