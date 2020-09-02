<template>
  <q-dialog v-model="state" persistent>
    <q-card style="min-width: 350px">
      <form @submit="onSubmit">
        <q-card-section>
          <div class="text-h6">Your OTP Key:</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input dense v-model="otp_key" autofocus />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" @click="action" />
          <q-btn
            :loading="config.loading"
            flat
            :label="!config.success ? 'Send':''"
            :icon="config.success? 'done': ''"
            type="submit"
          ></q-btn>
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "OTPComponent",
  data() {
    return {
      //   prompt: this.state,
      otp_key: "",
      config: {
        loading: false,
        success: false,
      },
    };
  },
  props: ["state", "action"],
  methods: {
    onSubmit: async function (e) {
      e.preventDefault();
      try {
        let response = await this.$store.dispatch("auth/validate_otp", {
          userId: this.$store.state.auth.credentials.userInfo.id,
          otp_key: this.otp_key,
        });

        setTimeout(() => {
          this.config.loading = false;
          this.config.success = true;
        }, 2000);
        setTimeout(() => {
          return this.$router.history.push("/homepage");
        }, 3000);
      } catch (e) {
        this.config.loading = false;
        console.log(e);
      }
    },
  },
};
</script>