<template>
  <div id="loading">
    <img src="../../assets/images/icbc.png" />
  </div>
</template>
<style scoped>
#loading {
  width: 60px;
  height: 60px;
  /* background-color:#e4f9ff8e;
    border: 1px solid #336d88; */
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 999 !important;
  /* transform: rotate(45deg); */
}
#loading>img {
  height: 60px;
  width: 60px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 25%;
  -webkit-animation: box 0.8s infinite;
}

#loading:after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 120%;
  left: 50%;
  width: 44px;
  height: 3px;
  background: #eaeaea;
  border-radius: 100%;
  transform: translateX(-50%);
  -webkit-animation: shadow 0.8s infinite;
}

@-webkit-keyframes shadow {
  0%,
  100% {
    /* left:54px; */
    width: 40px;
    background: #eaeaea;
    top: 120%;
  }
  50% {
    top: 120%;
    left: 50%; /*让阴影保持在原位*/
    width: 50px;
    height: 7px;
    background: #eee;
    /* transform: translateX(-50%); */
  }
}

@-webkit-keyframes box {
  0% {
    top: 50%;
  }
  50% {
    top: 70%;
    
  }
  100% {
    top: 50%;
  }
}
</style>