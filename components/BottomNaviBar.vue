<template>
  <div>
    <div
      id="nav"
      :style="`background: ${$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_front}`"
    >
      <SignInButton
        v-show="!userData"
        class="signInButton"
      />
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
              :color="path == item.value ? 'green_lighten' : 'blue_lighten'"
            >
              {{ item.icon }}
            </v-icon>
            <!--<span class="text-caption">{{ item.name }}</span>-->
          </button>
        </div>

        <button
          class="nav_btn mx-5"
          @click="$router.push('/account/' + (userData ? userData.uid : 'nonlogin'))"
        >
          <div v-if="path === '/account/' + (userData ? userData.uid : 'nonlogin')" class="nav_select_tag" />
          <v-avatar
            size="28"
            :color="path === '/account/' + (userData ? userData.uid : 'nonlogin') ? '#93DED2' : '#B7C9E4'"
          >
            <v-img
              :src="userData ? userData.photoURL : undefined"
            />
          </v-avatar>
        </button>

        <v-menu
          top
          offset-y
          nudge-top="24"
          rounded="normal"
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
              <v-icon size="32" color="blue_lighten">
                mdi-dots-vertical
              </v-icon>
            </v-btn>
          </template>

          <v-card :color="$vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background_front">
            <v-list
              color="transparent"
              class="px-4 pt-4 pb-0"
            >
              <v-list-item>
                <v-list-item-title>
                  ダークモード
                </v-list-item-title>
                <v-list-item-action>
                  <v-switch
                    v-model="isDarkMode"
                    color="green_lighten"
                  />
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-list
              rounded="normal"
              color="transparent"
              class="px-4 pt-0 pb-4"
            >
              <v-list-item-group>
                <v-list-item
                  to="/setting"
                  :ripple="{ class: 'green_lighten--text' }"
                >
                  <v-list-item-icon class="rounded-normal">
                    <v-icon>mdi-cog</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    設定
                  </v-list-item-title>
                </v-list-item>
                <v-list-item
                  :ripple="{ class: 'green_lighten--text' }"
                  @click="!userData ? signIn() : signOut()"
                >
                  <v-list-item-icon class="rounded-normal">
                    <v-icon>mdi-{{ !userData ? 'login' : 'logout' }}-variant</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title>
                    {{ !userData ? 'Googleでログイン' : 'ログアウト' }}
                  </v-list-item-title>
                </v-list-item>
              </v-list-item-group>

              <v-divider class="my-4" />

              <v-subheader style="height: auto">
                v0.0.0
              </v-subheader>
            </v-list>
          </v-card>
        </v-menu>
      </v-row>
    </div>
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
    userData () {
      return this.$store.getters['auth/userData']
    },
  },

  watch: {
    isDarkMode (newVal, oldVal) {
      this.$store.dispatch('darkMode/updateIsDarkMode', newVal)
    },
  },

  methods: {
    signIn () {
      this.$store.dispatch('auth/signIn')
    },
    signOut () {
      this.$store.dispatch('auth/signOut')
    },
  },
}
</script>

<style>
.signInButton {
  position: absolute;
  top: -44px;
  left: 50%;
  transform: translateX(-50%);
}

#nav {
  position: fixed;
  width: 100vw;
  height: 64px;
  bottom: 0%;

  z-index: 1;

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
  bottom: 8px;
  left: 50%;

  transform: translateX(-50%);
  animation: select ease-out 0.2s;

  border-radius: 4px 4px 4px 4px;

  background-color: #93DED2;
}

@keyframes select {
  0% {
    width: 0px;
  }
  100% {
    width: 28px;
  }
}

.button {
  position: absolute;
  top: calc(-16px - 100%);
  right: 16px;
}
</style>
