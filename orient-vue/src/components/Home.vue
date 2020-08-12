<template>
  <div id="home">
    <loading v-if="isLoading"></loading>
    <div id="left"><Nav></Nav></div>
    <div id="right">
      <Header ref="Header"></Header>
      <transition  name="fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
import Header from "./side/Header";
import Nav from "./side/Nav";
import loading from "./common/loading"
export default {
  name: "Home",
  props: {
    msg: String
  },
  computed:{
    isLoading(){
      return this.$store.state.isLoading
    }
  },
  components:{
    Nav,
    Header,
    loading
  },
  methods: {
    changeHeaderIsShow: function (status) {
      this.$ref.changeHeaderIsShow(status)
    }
  }
}


</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/style/home.css";
</style>
