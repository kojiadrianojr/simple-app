<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round icon="settings" />
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <!-- <q-form class="column items-center"> -->
              <q-toggle v-model="isTwoFactor" label="Activate 2FA" evt />
              <!-- <q-btn outline rounded label="Save Changes" color="primary"></q-btn> -->
              <!-- </q-form> -->
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <q-icon name="face" size="4rem" />
              </q-avatar>
              <div class="text-subtitle1 q-mt-md q-mb-xs">{{ userInfo.name }}</div>
              <q-btn
                :loading="config.loading"
                color="primary"
                label="Logout"
                push
                size="sm"
                v-close-popup
                @click="handleLogout"
                :disable="config.loading? true:false"
              >
                <template v-slot:loading>
                  <q-spinner-facebook />
                </template>
              </q-btn>
            </div>
          </div>
        </q-menu>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "AuthorizedPage",
  data() {
    return {
      otp_enabled: this.$store.state.auth.credentials.userInfo.otp_enabled,
      userInfo: this.$store.state.auth.credentials.userInfo,
      config: {
        loading: false,
      },
    };
  },
  computed: {
    isTwoFactor: {
      get: function () {
        return this.otp_enabled;
      },
      set: function () {
        this.otp_enabled = !this.otp_enabled;
      },
    },
  },
  methods: {
    handleLogout: async function () {
      this.config.loading = true;
      try {
        let response = this.$store.dispatch("auth/logout", {
          token: "",
          userInfo: {},
          authenticated: false,
        });
        setTimeout(() => {
          this.config.loading = false;
        }, 3000);
        return this.$router.history.go("/");
      } catch (e) {
        console.log(e);
      }
    },
    handleToggle: function () {
      console.log(this.isTwoFactor);
    },
  },
  watch: {
    otp_enabled: async function () {
      try {
        let response = await this.$store.dispatch("auth/manage_otp", {
          userId: this.$store.state.auth.credentials.userInfo.id,
          state: this.isTwoFactor,
        });
        
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
