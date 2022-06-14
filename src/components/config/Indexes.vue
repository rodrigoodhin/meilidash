<template>
  <n-select
    id="indexes"
    v-model:value="selectedValues"
    :options="optionsRef"
    :loading="loading"
    class="indexSelect"
    placeholder="Index"
    @update:value="handleUpdateValue"
    remote
  />
  <CreateIndex @refresh-indexes="refreshIndexes" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { callApi } from "@/api/api";
import type { SelectOption } from "naive-ui";
import { useIndexStore } from "@/stores/indexes";
import CreateIndex from "@/components/config/CreateIndex.vue";

const loadingRef = ref(false);
const selected = ref();
const optionsRef = ref<SelectOption[]>([]);

// Retrive Indexes from defined server
const getIndexes = async () => {
  const resData = await callApi("indexes", "GET", "", false);
  let output: SelectOption[] = [];
  resData.forEach((item: { uid: string; name: string }) => {
    output.push({
      value: item.uid,
      label: item.name,
    });
  });
  return output;
};

export default defineComponent({
  emits: ["refresh-indexes"],
  name: "ConfigIndexes",
  components: {
    CreateIndex,
  },
  setup() {
    const store = useIndexStore();

    onMounted(async () => {
      selected.value = store.getIndex;
      loadingRef.value = true;
      optionsRef.value = await getIndexes();
      loadingRef.value = false;
    });

    return {
      handleUpdateValue(value: string) {
        selected.value = value;
        store.setIndex(String(value));
      },
      loading: loadingRef,
      selectedValues: selected,
      optionsRef,
    };
  },
  methods: {
    async refreshIndexes() {
      loadingRef.value = true;
      optionsRef.value = await getIndexes();
      loadingRef.value = false;
    },
  },
});
</script>
<style>
.indexSelect {
  width: 100%;
}
</style>
