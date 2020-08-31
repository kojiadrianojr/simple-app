<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat round icon="settings" />
        <q-menu>
          <div class="row no-wrap q-pa-md">
            <div class="column">
              <div class="text-h6 q-mb-md">Settings</div>
              <q-toggle v-model="isTwoFactor" label="Activate 2FA" />
            </div>

            <q-separator vertical inset class="q-mx-lg" />

            <div class="column items-center">
              <q-avatar size="72px">
                <q-icon name="face" size="4rem" />
              </q-avatar>
              <div class="text-subtitle1 q-mt-md q-mb-xs">John Doe</div>
              <q-btn color="primary" label="Logout" push size="sm" v-close-popup />
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
      isTwoFactor: false,
    };
  },
};
</script>
