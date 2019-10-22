<template>
  <div>
    <b-table hover :items="items"></b-table>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import {error_catch} from "../common";
export default {
  data() {
    return {
      items: [],
    }
  },
  name: 'UserManage',
  props: {

  },
  created() {
    if (typeof Cookies.get("token")==="undefined") {
      this.$router.push('/login');
      return
    }

    this.axios.get("/users?index=1&size=10",{ auth: {username: Cookies.get("token") , password: "" } })
      .then((response) => {
        this.items=response.data.user_list
      })
      .catch((error) => {
        error_catch(error,this);
      });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
