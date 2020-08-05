<template>
  <div id="navbar">
    <el-menu
      :default-active="$route.path"
      @select="handleSelect"
      background-color="#204051"
      text-color="#e5e5e5"
      active-text-color="#ea9a96"
      router
    >
      <el-row class="nav_title">
          <img class="stag" src="../../assets/images/icbc.png" />
          <span>组合资产投资分析</span>
      </el-row>

      <el-menu-item v-for="menu in menuList" :key="menu.id" :index="menu.path">
        <i :class="menu.icon"></i>
        <span slot="title">{{menu.title}}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {};
  },
  computed: {
    menuList() {
      return this.$store.getters.menuList;
    },
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(this.menuList);
      console.log(key, keyPath);
    },
  },
};
</script>
<style scoped>
@media (min-width: 800px) {
  #navbar {
    height: 100%;
    width: 150px;
  }
}
@media (min-width: 1280px) {
  #navbar {
    height: 100%;
    width: 200px;
  }
}

.el-menu {
  height: 100%;
}
.nav_title {
  text-align: center;
  color: #fff;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid rgb(220, 222, 226);
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-menu-item{
  display: flex;
  align-items: center;
  justify-content: center;
}
.stag {
  width: 20px;
  height: 20px;
  margin-right: 10px;
}
.nav_title > .el-col-2{
  width: 20px;
}
</style>