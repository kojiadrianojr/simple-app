<template>
  <q-form @submit="onSubmit">
    <InputFields
      v-for="field in fieldList"
      :key="field.name"
      v-model="payload[field.name.toLowerCase()]"
      v-bind="field"
      :titlename="field.name.toLowerCase()"
    />
    <q-btn-group spread>
      <q-btn
        :loading="config.loading"
        :label="config.success? 'Successfully Login!':'Login'"
        :color="config.error? 'red' : config.success?'green' :'primary'"
        type="submit"
        :disable="config.loading? true : false"
      >
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />Loading...
        </template>
      </q-btn>
    </q-btn-group>
  </q-form>
</template>
<script>
import InputFields from "./components/InputFields";
const fields = [
  {
    name: "Username",
    icon: "account_circle",
  },
  {
    name: "Password",
    icon: "vpn_key",
  },
];

export default {
  name: "LoginComponent",
  components: { InputFields },
  data() {
    return {
      config: {
        loading: false,
        error: false,
        success: false,
      },
      payload: {
        username: "",
        password: "",
      },
      fieldList: fields,
    };
  },
  methods: {
    onSubmit: async function (e) {
      e.preventDefault();
      this.config.loading = true;
      try {
        let response = await this.$store.dispatch("auth/login", this.payload);
        setTimeout(() => {
          this.config.loading = false;
          this.config.error = false;
          this.config.success = true;
          if (!this.$store.state.auth.credentials.userInfo.otp_enabled) {
            return this.$router.history.push("/homepage");
          }
        }, 3000);
        // console.log(this.$router)
      } catch (e) {
        console.log(e);
        setTimeout(() => {
          this.config.loading = false;
          this.config.error = true;
          this.config.success = false;
        }, 3000);
      }
    },
  },
};
</script>
<style lang="stylus" scoped>
.main-container {
  height: 100vh;
  border: 1px solid black;
}
</style>