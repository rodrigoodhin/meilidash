<template>
  <h4>{{ title }}</h4>
  <div v-if="!loading">
    <n-dynamic-input
      v-model:value="value"
      :loading="loading"
      placeholder="Please type here"
      :min="1"
      :max="100"
    />
    <n-form-item>
      <n-button @click="saveData()" v-if="!dataChanged">Save</n-button>
    </n-form-item>
  </div>
  <div v-if="loading">Loading Data</div>
</template>

<script lang="ts">
import type { Synonyms, TypoTolerance } from "meilisearch";
import { defineComponent, ref, onMounted, useAttrs } from "vue";
import { callApi } from "@/api/api";

export default defineComponent({
  setup() {
    const attrs = useAttrs();
    const dataChanged = ref(false);
    const optionsRef = ref([]);
    const optionsDefault = ref([]);
    const title = attrs.label;
    const loadingRef = ref(false);

    const attributeData = async () => {
      const { index } = await callApi();
      let resData = [] as string[];

      switch (attrs.attribute) {
        case "displayed-attributes": {
          resData = await index.getDisplayedAttributes();
          break;
        }
        case "searchable-attributes": {
          resData = await index.getSearchableAttributes();
          break;
        }
        case "filterable-attributes": {
          resData = await index.getFilterableAttributes();
          break;
        }
        case "sortable-attributes": {
          resData = await index.getSortableAttributes();
          break;
        }
        case "ranking-rules": {
          resData = await index.getRankingRules();
          console.log(resData);
          break;
        }
        case "synonyms": {
          let res = await index.getSynonyms();
          resData = Object.values(res);
          break;
        }
        case "distinct-attribute": {
          let res = await index.getDistinctAttribute();
          if (res !== null) {
            resData.push(res);
          }
          break;
        }
        case "stop-words": {
          resData = await index.getStopWords();
          break;
        }
        case "typoTolerance": {
          resData = await index.getTypoTolerance();
          break;
        }
      }

      return JSON.stringify(resData);
    };

    const saveData = async () => {
      const { index } = await callApi();
      let resData = null;

      switch (attrs.attribute) {
        case "displayed-attributes": {
          resData = await index.updateDisplayedAttributes(optionsRef.value);
          break;
        }
        case "searchable-attributes": {
          resData = await index.updateSearchableAttributes(optionsRef.value);
          break;
        }
        case "filterable-attributes": {
          resData = await index.updateFilterableAttributes(optionsRef.value);
          break;
        }
        case "sortable-attributes": {
          resData = await index.updateSortableAttributes(optionsRef.value);
          break;
        }
        case "ranking-rules": {
          resData = await index.updateRankingRules(optionsRef.value);
          break;
        }
        case "synonyms": {
          let val: Synonyms = {};
          val = optionsRef.value[0];
          resData = await index.updateSynonyms(val);
          break;
        }
        case "distinct-attribute": {
          resData = await index.updateDistinctAttribute(optionsRef.value[0]);
          break;
        }
        case "stop-words": {
          resData = await index.updateStopWords(optionsRef.value);
          break;
        }
        case "typoTolerance": {
          let val: TypoTolerance = {};
          val = optionsRef.value[0];
          resData = await index.updateTypoTolerance(val);
          break;
        }
      }
      return resData;
    };

    /*     const changed = () => {
      util.isDeepStrictEqual(optionsRef, optionsDefault);
    }; */

    onMounted(async () => {
      loadingRef.value = true;
      const data = await attributeData();
      optionsRef.value = JSON.parse(data);
      optionsDefault.value = JSON.parse(data);
      loadingRef.value = false;
    });

    return {
      value: optionsRef,
      title,
      loading: loadingRef,
      dataChanged,
      saveData: saveData,
    };
  },
});
</script>
