<template>
  <b-container fluid>
    <b-row>
      <b-col md="12" class="header"><NavBar /></b-col>
    </b-row>
    <b-row>
      <b-col md="2" class="aside"><Menu /></b-col>
      <b-col md="10">
        <b-row>
          <b-col class="main">
            <h1 v-if="mainFlag">main-page</h1>
            <UserManage v-if="userManageFlag" />
            <TestPage v-if="testPageFlag" />
            <TaskManage v-if="taskManageFlag" />
          </b-col>
        </b-row>
        <b-row>
          <b-col class="footer">footer</b-col>
        </b-row>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import NavBar from "./NavBar";
import Menu from "./Menu";
import UserManage from "./UserManage";
import TestPage from "./TestPage";
import TaskManage from "./TaskManage";

export default {
  name: 'Index',
  props: {

  },
  components: {
    TestPage,
    UserManage,
    NavBar,
    Menu,
    TaskManage,
  },
  computed: {
    mainFlag() {
      return this.$store.state.mainFlag
    },
    userManageFlag() {
      return this.$store.state.userManageFlag
    },
    testPageFlag() {
      return this.$store.state.testPageFlag
    },
    taskManageFlag() {
      return this.$store.state.taskManageFlag
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  padding: 0;
  height: 56px;
}

.aside {
  background-color: #676a6d;
}

.main {
  height: 880px;
}

.footer {
  height: 60px;
  background-color: beige;
  bottom: 0;
  position: fixed;
}

</style>
