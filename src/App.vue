<template>
  <div>
    <Header></Header>
    <div class="d-flex">
      <div class="vh-100">
        <Navbar></Navbar>
      </div>
      <div class="w-100 p-3">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Navbar from "./components/Navbar.vue";
</script>

<style></style>
