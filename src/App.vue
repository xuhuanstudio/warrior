<template>
  <div id="app">
    <transition name="gradual">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  created(){
    // 如果router mode 是 abstract ，则配置的重定向无效，需要手动激活
    this.$router.replace('/');
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;

  outline: none;
  /*font-size: 14px;*/
  list-style: none;
}

.gradual-enter-active, .gradual-leave-active{
    transition: opacity 3s;
}
.gradual-enter, .gradual-leave-to{
    opacity: 0;
}
</style>
