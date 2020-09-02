<template>
  <div class="main-cont flex flex-center">
    <q-card class="form" >
      <q-card-section>
        <component :is="FormComponent"></component>
      </q-card-section>
      <q-btn-group spread>
        <q-btn
          flat
          rounded
          color="secondary"
          :label="isRegister? 'Already have an account? Click here to Login':'Interested? Join us now!' "
          @click="changeForm"
        />
      </q-btn-group>
    </q-card>
  </div>
</template>

<script>
import LoginComponent from "./Login";
import RegisterComponent from "./Register";

export default {
  name: "LoginPage",
  components: { LoginComponent, RegisterComponent },
  data() {
    return {
      isRegister: false,
      FormComponent: LoginComponent,
    };
  },
  methods: {
    changeForm: function () {
      this.isRegister = !this.isRegister;
      return this.FormComponent === LoginComponent
        ? (this.FormComponent = RegisterComponent)
        : (this.FormComponent = LoginComponent);
    },
  },
};
</script>

<style scoped>
.main-cont {
  border: 1px solid black;
  height: 100vh;
  background: url("../../assets/bg/login-wallpaper.jpg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.form {
  min-width: 30%;
  background-color: rgba(0, 0, 0, 0.6);
  border: none;
  box-shadow: none;
  min-height: 30vh;
  padding: 25px;
}
</style>