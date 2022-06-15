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
import type { EnqueuedTask } from "meilisearch";
import { defineComponent, ref } from "vue";
import { useMessage } from "naive-ui";
import IconPlus from "../icons/IconPlus.vue";
import { callApi } from "@/api/api";
import { checkEndedTask } from "@/helpers/tasks";

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

let saveNewIndex: { (): Promise<EnqueuedTask | undefined> };

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
      const { client } = await callApi();
      let resData;

      if (indexModel.value.uid !== "" && indexModel.value.primaryKey !== "") {
        resData = await client.createIndex(indexModel.value.uid, {
          primaryKey: indexModel.value.primaryKey,
        });
        message.success("Index queued");

        const task = await checkEndedTask(resData.uid);
        if (task.status === "succeeded") {
          showModalRef.value = false;
          indexModel.value.uid = "";
          indexModel.value.primaryKey = "";
          message.success("Index indexed");
        } else {
          message.error("Error creating index");
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
    async saveIndex() {
      await saveNewIndex();
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
