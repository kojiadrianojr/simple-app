<template>
  <q-form @submit="onSubmit">
    <InputFields
      v-for="field in fieldList"
      :key="field.name"
      v-bind="field"
      :titlename="field.name.toLowerCase()"
      v-model="payload[field.name.toLowerCase().replace(' ', '')]"
    />
    <q-btn-group spread>
      <q-btn :loading="config.loading" :label="config.success? 'Now Redirecting ....': 'Register' " :color="config.error? 'red': config.success? 'green': 'primary'" type="submit" :disable="config.loading? true : false">
         <template v-slot:loading>
        <q-spinner-hourglass class="on-left" />
        Loading...
      </template>
      </q-btn>
    </q-btn-group>
  </q-form>
</template>

<script>
import InputFields from "./components/InputFields";
let fields = [
  {
    name: "Full name",
  },
  {
    name: "Email Address",
  },
  {
    name: "Username",
  },
  {
    name: "Password",
  },
  {
    name: "Confirm Password",
  },
];
export default {
  name: "RegisterComponent",
  components: { InputFields },
  data() {
    return {
      config: {
        loading: false,
        error: false,
        success: false
      },
      
      fieldList: fields,
      payload: {
        fullname: "",
        emailaddress: "",
        username: "",
        password: "",
        confirmpassword: "",
      },
    };
  },
  methods: {
    onSubmit: async function (e) {
      e.preventDefault();
      this.config.loading = true;
      if (
        !this.payload.fullname ||
        !this.payload.emailaddress ||
        !this.payload.username ||
        !this.payload.username ||
        !this.payload.password ||
        !this.payload.confirmpassword
      ) {
        this.config.loading = false;
        this.config.error = true;
        this.$notify({
          group: "auth",
          title: "Check input fields",
          text: "Please enter required data!",
          type: "warn"
        });
      }
      try {
        let response = await this.$store.dispatch(
          "auth/register",
          this.payload
        );
        this.$store.dispatch('auth/login', this.payload);
        setTimeout(() => {
          this.config.loading = false;
          this.config.error = false;
          this.config.success = true;
        }, 3000);
         this.$notify({
          group: "auth",
          title: "Registration Success",
          text: response.data.msg,
          type: "success",
        });
      } catch (e) {
        this.$notify({
          group: "auth",
          title: "Registration Failed",
          text: e,
          type: "error",
        });
        setTimeout(() => {
          this.config.loading = false;
          this.config.error = true;
        }, 3000);
      }
    },
  },
};
</script>