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
      <q-btn label="Login" color="primary" type="submit" />
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
      console.log(this.payload);
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