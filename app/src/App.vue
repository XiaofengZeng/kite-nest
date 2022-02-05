<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- 测试Vuex -->
  <h1>{{ $store.state.finish }}</h1>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- 测试Vouter -->
  <div>
    <router-link to="/HelloWorld">To HelloWorld</router-link>
    <router-view></router-view>
  </div>

  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
