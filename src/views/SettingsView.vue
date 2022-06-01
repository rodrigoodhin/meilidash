<template>
  <n-layout has-sider>
    <n-layout-sider content-style="padding: 24px;">
      <Menu />
    </n-layout-sider>
    <n-layout-content content-style="padding: 24px;">
      <router-view></router-view>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import Menu from "@/components/settings/Menu.vue";
</script>

<style scoped></style>
