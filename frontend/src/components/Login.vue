<template>
  <div>
    <b-form @submit="onSubmit" class="login-form">
      <b-form-group
        class="login-title"
        label="login"
      >
      </b-form-group>
      <b-form-group
        id="username-group"
        label-for="username-input"
      >
        <b-form-input
          id="username-input"
          v-model="form.username"
          required
          placeholder="Enter username"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group
        id="password-group"
        label-for="password-input"
      >
        <b-form-input
          id="password-input"
          v-model="form.password"
          type="password"
          required
          placeholder="Enter password"
        >
        </b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">login</b-button>
    </b-form>
  </div>

</template>
<script>
import Cookies from 'js-cookie'
import {error_catch} from "../common";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      }
    }
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();

      this.axios.get("/token", { auth: {username: this.form.username, password: this.form.password } },)
        .then((response) => {
          Cookies.set("token", response.data.token, { expires: response.data.duration });
          this.$store.commit("setUsername",this.form.username);
          this.$router.push("/");
        })
        .catch((error) => {
          error_catch(error,this)
        })
    },
  },
  name: 'Login',
  props: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login-title {
  font-size: 22px;
  font-weight: bold;
}

.login-form {
  text-align: center;
  margin-left: calc(50% - 150px);
  margin-top: 10%;
  width: 300px;
  height: 200px;
}
</style>
