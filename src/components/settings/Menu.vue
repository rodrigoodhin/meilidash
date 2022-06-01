<template>
  <n-menu :options="menuOptions" />
</template>

<script lang="ts">
import { defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import { useMessage } from "naive-ui";
import type { MenuOption } from "naive-ui";

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "displayed",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Displayed Attributes" }
      ),
    key: "displayed",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "searchable",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Searchable Attributes" }
      ),
    key: "searchable",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "filterable",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Filterable Attributes" }
      ),
    key: "filterable",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "sortable",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Sortable Attributes" }
      ),
    key: "sorta ble",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "rankingRules",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Ranking Rules" }
      ),
    key: "rankingRules",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "synonyms",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Synonyms" }
      ),
    key: "synonyms",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "distinct",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Distinct Attribute" }
      ),
    key: "distinct",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "typoTolerance",
            params: {
              lang: "en-US",
            },
          },
        },
        { default: () => "Typo Tolerance" }
      ),
    key: "typoTolerance",
  },
];

export default defineComponent({
  setup() {
    return {
      menuOptions,
    };
  },
});
</script>
