<template>
  <b-nav vertical>
    <b-nav-item v-b-toggle.collapse-1 class="menu-item">一级菜单1</b-nav-item>
    <b-collapse id="collapse-1" class="sub-item">
      <b-nav vertical>
        <b-nav-item>二级菜单1</b-nav-item>
        <b-nav-item>二级菜单2</b-nav-item>
        <b-nav-item>二级菜单3</b-nav-item>
      </b-nav>
    </b-collapse>
    <b-nav-item @click="changeMenu(1)">用户管理</b-nav-item>
    <b-nav-item @click="changeMenu(2)">测试页面</b-nav-item>
    <b-nav-item @click="changeMenu(3)">任务管理</b-nav-item>
  </b-nav>
</template>

<script>
export default {
  name: 'Menu',
  props: {

  },
  methods: {
    changeMenu: function(item){
      this.$store.commit("setMenuFlag",item);
    },
  },
  data() {
    return {
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .sub-item {
    margin-left: 15px;
  }

  a {
    color: #FFFFFF;
  }
</style>
