<template>
  <q-form>
    <InputFields
      v-for="field in fieldList"
      :key="field.name"
      v-bind="field"
      :titlename="field.name.toLowerCase()"
      v-model="payload[field.name.toLowerCase().replace(' ', '')]"
    />
    <q-btn-group spread>
      <q-btn label="Register" color="primary" />
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
      fieldList: fields,
      payload: {
        fullname: '',
        emailaddress: '',
        username: '',
        password: '',
        confirmpassword: ''
      },
    };
  },
};
</script>