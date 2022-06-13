<template>
  <n-button @click="showModal = true">
    <IconPlus />
  </n-button>
  <n-modal
    v-model:show="showModal"
    class="custom-card"
    preset="card"
    :style="bodyStyle"
    title="Create a new index"
    :bordered="false"
    size="huge"
    :segmented="segmented"
  >
    <n-form
      ref="formRef"
      inline
      :label-width="80"
      :model="indexModel"
      :rules="rules"
      :size="size"
    >
      <n-form-item label="UID" path="uid">
        <n-input v-model:value="indexModel.uid" placeholder="Input UID" />
      </n-form-item>
      <n-form-item label="Primary Key" path="primaryKey">
        <n-input
          v-model:value="indexModel.primaryKey"
          placeholder="Input Primary Key"
        />
      </n-form-item>
    </n-form>

    <template #footer>
      <n-button @click="saveIndex()">Save</n-button>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { FormInst } from "naive-ui";
import { useMessage } from "naive-ui";
import IconPlus from "../icons/IconPlus.vue";
import { callApi } from "@/api/api";
import { useIndexStore } from "@/stores/indexes";

export default defineComponent({
  components: {
    IconPlus,
  },
  setup() {
    const formRef = ref<FormInst | null>(null);
    const message = useMessage();
    const store = useIndexStore();
    const showModalRef = ref(false);

    const indexModel = ref({
      uid: "",
      primaryKey: "",
    });

    const saveIndex = async () => {
      console.log(indexModel.value);
      const resData = await callApi(
        "indexes/",
        "POST",
        JSON.stringify(indexModel.value, null, 2),
        false
      );
      showModalRef.value = false;
      store.getIndex;
      message.warning("Index successfully created");
      return resData;
    };

    return {
      saveIndex: saveIndex,
      bodyStyle: {
        width: "600px",
      },
      segmented: {
        content: "soft",
        footer: "soft",
      } as const,
      size: "medium",
      rules: {
        uid: {
          required: true,
          message: "Please input UID",
          trigger: ["input", "blur"],
        },
        primaryKey: {
          required: true,
          message: "Please input Primary Key",
          trigger: ["input", "blur"],
        },
      },
      handleValidateClick(e: MouseEvent) {
        e.preventDefault();
        formRef.value?.validate((errors) => {
          if (!errors) {
            message.success("Valid");
          } else {
            console.log(errors);
            message.error("Invalid");
          }
        });
      },
      indexModel: indexModel,
      showModal: showModalRef,
    };
  },
});
</script>
