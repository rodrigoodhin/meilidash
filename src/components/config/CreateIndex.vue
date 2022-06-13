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
      <n-button @click="saveIndex">Save</n-button>
    </template>
  </n-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import type { FormInst } from "naive-ui";
import { useMessage } from "naive-ui";
import IconPlus from "../icons/IconPlus.vue";
import { callApi } from "@/api/api";

const indexModel = ref({
  uid: "",
  primaryKey: "",
});

const showModalRef = ref(false);
//const formRef = ref<FormInst | null>(null);

const modalStyle = {
  width: "600px",
};

const segmented = {
  content: "soft",
  footer: "soft",
};

const rules = {
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
};

let saveNewIndex: { (): void; (): Promise<any> };

export default defineComponent({
  name: "CreateIndex",
  emits: {
    "refresh-indexes": null,
  },
  components: {
    IconPlus,
  },
  setup() {
    const message = useMessage();

    saveNewIndex = async () => {
      let resData;

      if (indexModel.value.uid !== "" && indexModel.value.primaryKey !== "") {
        resData = await callApi(
          "indexes/",
          "POST",
          JSON.stringify(indexModel.value, null, 2),
          false
        );

        if (resData.isSuccess === false) {
          message.error("Error creating index");
          
        } else {
          showModalRef.value = false;
          indexModel.value.uid = "";
          indexModel.value.primaryKey = "";
          message.success("Index successfully created");
        }
      }

      return resData;
    };

    return {
      bodyStyle: modalStyle,
      segmented: segmented,
      indexModel: indexModel,
      showModal: showModalRef,
      rules: rules,
    };
  },
  methods: {
    saveIndex() {
      saveNewIndex();
      this.$emit("refresh-indexes");
    },
  },
});
</script>

<style scoped>
form svg {
  width: 20px;
}
</style>