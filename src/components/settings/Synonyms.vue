<template>
  <h4>{{ title }}</h4>
  <div v-if="!loading">
    <n-dynamic-input
      v-model:value="value"
      :on-create="onCreate"
      :min="1"
      :max="10"
    >
      <template #default="{ value }">
        <div style="display: flex; align-items: center; width: 100%">
          <n-input
            v-model:value="value.word"
            type="text"
            placeholder="Please type here"
          />
          <n-select v-model:value="value.synonyms" filterable multiple tag />
        </div>
      </template>
    </n-dynamic-input>
    <pre>{{ JSON.stringify(value, null, 2) }}</pre>
    <n-form-item>
      <n-button @click="saveData()" v-if="!dataChanged">Save</n-button>
    </n-form-item>
  </div>
  <div v-if="loading">Loading Data</div>
</template>

<script lang="ts">
import type { Synonyms } from "meilisearch";
import { defineComponent, ref, onMounted, useAttrs } from "vue";
import { callApi } from "@/api/api";

export default defineComponent({
  setup() {
    const attrs = useAttrs();
    const dataChanged = ref(false);
    const optionsRef = ref([
      {
        word: "",
        synonyms: [],
      },
    ]);
    const optionsDefault = ref([]);
    const title = attrs.label;
    const loadingRef = ref(false);

    const attributeData = async () => {
      const { index } = await callApi();

      let res = await index.getSynonyms();
      console.log(res);

      const entries = Object.entries(res);
      entries.forEach(([key, value]) => {
        optionsRef.value.push({
          word: key,
          synonyms: value,
        });
      });

      return JSON.stringify(res);
    };

    const saveData = async () => {
      const { index } = await callApi();

      let values: Synonyms = {};
      optionsRef.value.forEach((item) => {
        values![item.word] = item.synonyms;
      });

      const resData = await index.updateSynonyms(values);

      return resData;
    };

    onMounted(async () => {
      loadingRef.value = true;
      const data = await attributeData();
      optionsRef.value = JSON.parse(data);
      optionsDefault.value = JSON.parse(data);
      loadingRef.value = false;
    });

    return {
      value: optionsRef,
      onCreate() {
        return {
          word: "",
          synonyms: [],
        };
      },
      title,
      loading: loadingRef,
      dataChanged,
      saveData: saveData,
    };
  },
});
</script>
