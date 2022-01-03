<template>
  <v-container class="px-0">
    <v-stepper
      v-model="nowStep"
      flat
      vertical
      color="green"
      class="stepper"
      :style="{backgroundColor: $vuetify.theme.themes[$vuetify.theme.dark ? 'dark' : 'light'].background}"
    >
      <v-stepper-step
        :complete="nowStep > 1"
        color="blue"
        step="1"
      >
        サインイン
      </v-stepper-step>

      <v-stepper-content step="1">
        <h2>Googleアカウントでサインインしましょう</h2>
        <p>ログインすることで、投稿が出来たり、報酬が貰えるようになります。</p>
        <v-card-actions class="pa-0">
          <SignInButton class="my-2 mr-4" />
          <Button
            type="sml"
            flat
            color="background"
            @click.native="$router.push('/timeline')"
          >
            タイムラインに移動
          </Button>
        </v-card-actions>
      </v-stepper-content>

      <v-stepper-step
        :complete="nowStep > 2"
        color="blue"
        step="2"
      >
        セットアップ
      </v-stepper-step>

      <v-stepper-content step="2">
        <h2>プロフィールを作成しましょう</h2>
        <p>あなたのニックネームと自己紹介（旅好きとか食べ歩き好きとか）を書きましょう！</p>
        <v-row no-gutters class="pt-8">
          <v-col class="px-0">
            <v-text-field
              id="text-field"
              v-model="name"
              placeholder="好きな名前を設定しましょう"
              auto-grow
              outlined
              clearable
              color="green"
              style="word-break: break-all; white-space: normal;"
            >
              <template #label>
                <p style="font-size: 20px;">
                  名前
                </p>
              </template>
            </v-text-field>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col class="px-0">
            <v-textarea
              id="text-field"
              v-model="detail"
              placeholder="あなたのことが分かるような紹介文を書いてみましょう"
              counter="100"
              auto-grow
              outlined
              clearable
              color="green"
              style="word-break: break-all; white-space: normal;"
            >
              <template #label>
                <p style="font-size: 20px;">
                  自己紹介
                </p>
              </template>
            </v-textarea>
          </v-col>
        </v-row>
        <v-card-actions class="pa-0">
          <Button
            type="sml"
            flat
            color="green"
            class="mr-4"
            @click.native="setupUserProfile()"
          >
            作成する！
          </Button>
          <Button
            type="sml"
            flat
            color="background"
            @click.native="$router.push('/signup?step=1')"
          >
            戻る
          </Button>
        </v-card-actions>
      </v-stepper-content>

      <v-stepper-step
        :complete="nowStep > 3"
        color="blue"
        step="3"
      >
        アプリをインストール
      </v-stepper-step>

      <v-stepper-content step="3">
        <h2>アプリをインストールして快適に使おう</h2>
        <p>アプリをインストールすることで、気が向いた時すぐに投稿・閲覧できます。めっちゃ良くないですか？</p>
        <strong>インストール方法</strong>
        <ul class="mt-2">
          <li class="mb-4">
            Androidの場合<br>
            ※<strong>Chromeを推奨します</strong>
            <ol>
              <li>下の「アプリをインストール」を押します</li>
              <li>モーダルの「インストール」を押すとアプリがインストールされます</li>
              <li>ホーム画面に「Fascino」が追加されます</li>
            </ol>
          </li>
          <li class="mb-4">
            iOSの場合<br>
            ※<strong>Safariを推奨します</strong>
            <ol>
              <li>「共有（下中央）」を押します</li>
              <li> 下にスクロールし、「ホーム画面に追加」を押します</li>
              <li>ホーム画面に「Fascino」が追加されます</li>
            </ol>
          </li>
        </ul>
        <PWAInstallButton class="mr-4" />
        <Button
          type="sml"
          flat
          color="background"
          class="my-4"
          @click.native="$router.push('/timeline')"
        >
          インストールせずに使う
        </Button>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      googleUserData: null,
      name: '',
      detail: '',
    }
  },

  computed: {
    nowStep () {
      const nowStep = this.$route.query.step
      if (nowStep === '2') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.googleUserData = this.$store.getters['auth/googleUserData']
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        if (this.googleUserData != null) {
          // eslint-disable-next-line vue/no-side-effects-in-computed-properties
          this.name = this.googleUserData.displayName
        }
      }
      return nowStep
    },
  },

  methods: {
    async setupUserProfile () {
      await this.$store.dispatch('firestore/addData', {
        uid: this.googleUserData.uid,
        name: this.name,
        detail: this.detail,
        liked: 0,
        wented: 0,
        photoURL: this.googleUserData.photoURL,
      }).then(() => {
        this.$router.push('/signup?step=3')
      })
    },
  },
}
</script>
