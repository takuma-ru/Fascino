<template>
  <div id="nav">
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
          <v-icon size="32px" :color="path == item.value ? '#93DED2' : '#B7C9E4'">
            {{ item.icon }}
          </v-icon>
          <!--<span class="text-caption">{{ item.name }}</span>-->
        </button>
      </div>
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
        { value: '/map', name: 'マップ', icon: 'icon-homeIcon' },
      ],
    }
  },

  computed: {
    path () {
      return this.$route.path
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
  box-shadow: 0px 0px 6px 3px #00214D;

  background-color: #112E56;
}

.nav_btn {
  position: relative;
  width: 40px;
  height: 64px;
}

.nav_btn .nav_select_tag {
  position: absolute;
  width: 24px;
  height: 4px;
  top: 0%;
  left: 50%;

  transform: translateX(-50%);

  border-radius: 0px 0px 4px 4px;

  background-color: #93DED2;
}
</style>
