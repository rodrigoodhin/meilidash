<template>
  <n-button @click="activate('right')">Server</n-button>
  <n-drawer v-model:show="active" :width="502" :placement="placement">
    <n-drawer-content title="Server Data">
      <n-form ref="formRef" :model="model">
        <n-form-item path="domain" label="Server">
          <n-input v-model:value="model.domain" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="masterkey" label="Master Key">
          <n-input
            v-model:value="model.masterkey"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item>
          <n-button @click="save()">Save and Test</n-button>
        </n-form-item>
      </n-form>
      <n-form-item path="index" label="Selected Index">
        <Indexes />
      </n-form-item>
    </n-drawer-content>
  </n-drawer>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import type { DrawerPlacement } from "naive-ui";
import { useMessage } from "naive-ui";
import { useServerStore } from "@/stores/server";
import type { ServerType } from "@/stores/server";
import Indexes from "./Indexes.vue";

export default defineComponent({
  name: "ServerComponent",
  components: {
    Indexes,
  },
  setup() {
    const server = useServerStore();

    const active = ref(false);

    const placement = ref<DrawerPlacement>();

    const activate = (place: DrawerPlacement) => {
      active.value = true;
      placement.value = place;
    };

    const modelRef = ref<ServerType>({
      domain: "",
      masterkey: "",
    });

    const message = useMessage();
    onMounted(() => {
      modelRef.value = server.getServerData;
    });

    const save = function () {
      server.setServerData(modelRef.value);
      message.warning("Save data");
    };

    return {
      save,
      active,
      placement,
      activate,
      model: modelRef,
    };
  },
});
</script>
