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
          <q-btn-group>
            <q-btn flat label="Cancel" @click="action" align="center" />
            <q-btn
              :loading="config.generate.loading"
              :icon="config.generate.success? 'done': ''"
              flat
              :label="!config.generate.success? 'Generate new OTP': ''"
              @click="onGenerate"
              :color="config.generate.success? 'green':'primary'"
              :disable="config.generate.success? true: false"
              align="center"
            />
            <q-btn
              :loading="config.loading"
              flat
              :color="config.success? 'green':config.error? 'red':'primary'"
              :label="!config.success ? 'Send':''"
              :icon="config.success? 'done': ''"
              align="center"
              type="submit"
            ></q-btn>
          </q-btn-group>
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
        generate: { loading: false, success: false },
        loading: false,
        success: false,
      },
    };
  },
  props: ["state", "action"],
  methods: {
    onSubmit: async function (e) {
      e.preventDefault();
      this.config.loading = true;
      try {
        let response = await this.$store.dispatch("auth/validate_otp", {
          userId: this.$store.state.auth.credentials.userInfo.id,
          otp_key: this.otp_key,
        });

        if (response.data.otp_granted) {
          setTimeout(() => {
            this.config.loading = false;
            this.config.success = true;
          }, 2000);
          setTimeout(() => {
            return this.$router.history.push("/homepage");
          }, 3000);
        } else {
          this.config.loading = false;
          this.config.error = true;
        }
      } catch (e) {
        this.config.loading = false;
        console.log(e);
      }
    },
    onGenerate: async function () {
      try {
        this.config.generate.loading = true;
        let response = await this.$store.dispatch("auth/generate_otp", {
          userId: this.$store.state.auth.credentials.userInfo.id,
          jwt_token: this.$store.state.auth.credentials.token,
        });
        this.$notify({
          group: "auth",
          title: response.data.msg,
          type: "success",
        });
        setTimeout(() => {
          this.config.generate.loading = false;
          this.config.generate.success = true;
        }, 3000);
        setTimeout(() => {
          // this.config.generate.loading = false;
          this.config.generate.success = false;
        }, 6000);
      } catch (e) {
        this.config.generate.loading = false;
        this.config.generate.success = false;
        this.$notify({
          group: "auth",
          title: "Failed please try again",
          type: "error",
        });
      }
    },
  },
};
</script>