<template>
  <q-input
    dark
 
    :value="value"
    @input="val => updateValue(val)"
    :label="name"
    rounded
    outlined
    :type="(!showPass && titlename === 'password' ) || (!showPass && titlename == 'confirm password')? 'password':'text'"
    lazy-rules
    :rules="[val => val && val.length > 0 || `Please enter your ${name}`]"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
    <template v-slot:append v-if="titlename === 'password' || titlename === 'confirm password'">
      <q-icon
        :name="showPass?'visibility':'visibility_off'"
        class="cursor-pointer"
        @click="showPass=!showPass"
      />
    </template>
  </q-input>
</template>
<script>
export default {
  name: "InputField",
  data() {
    return {
      data: this.model,
      showPass: false,
    };
  },
  computed: {
    dataModel: function () {
      return this.data;
    },
  },
  props: ["name", "titlename", "value", "icon"],
  methods: {
    updateValue(value) {
      this.$emit("input", value);
    },
  },
};
</script>