<template>
  <n-space vertical>
    <n-select v-model:value="value" :options="options" />
  </n-space>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return {
      value: ref(null),
      options: [
        {
          label: "Index 1",
          value: "index1",
        },
        {
          label: "Index 2",
          value: "index2",
        },
        {
          label: "Index 3",
          value: "index3",
        },
      ],
    };
  },
});
</script>
