<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import Logo from "./components/Logo.vue";
import IconSearchDocument from "./components/icons/IconSearchDocument.vue";
import IconSettings from "./components/icons/IconSettings.vue";
import Config from "./components/config/Index.vue";
</script>

<template>
  <n-message-provider>
    <n-layout>
      <n-layout-header>
        <Logo />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/search"><IconSearchDocument /> Search</RouterLink>
          <RouterLink to="/settings"><IconSettings /> Settings</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
        <Config />
      </n-layout-header>
      <RouterView :key="$route.fullPath" />
      <n-layout-footer>Copyright BLABLA</n-layout-footer>
    </n-layout>
  </n-message-provider>
</template>

<style>
#app {
  max-width: 1280px;
  margin: 0 auto;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: inline;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

nav svg {
  width: 20px;
}
@media (min-width: 1024px) {
  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
