<template>
  <h4>Synonyms</h4>
  <n-dynamic-input
    v-model:value="value"
    placeholder="Please type here"
    :min="1"
    :max="10"
  />
  <pre>{{ JSON.stringify(value, null, 2) }}</pre>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      value: ref([""]),
    };
  },
});
</script>
