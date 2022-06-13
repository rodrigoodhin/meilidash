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
      const resData = await callApi(
        "/settings/" + attrs.attribute,
        "GET",
        "",
        true
      );
      return resData;
    };

    const saveData = async () => {
      const resData = await callApi(
        "/settings/" + attrs.attribute,
        "POST",
        JSON.stringify(optionsRef.value, null, 2),
        true
      );
      return resData;
    };

    /*     const changed = () => {
      util.isDeepStrictEqual(optionsRef, optionsDefault);
    }; */

    onMounted(async () => {
      loadingRef.value = true;
      optionsRef.value = await attributeData();
      optionsDefault.value = await attributeData();
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
