<template>
  <n-menu :options="menuOptions" />
</template>

<script lang="ts">
import { defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import type { MenuOption } from "naive-ui";

const menuOptions: MenuOption[] = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "displayed",
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
              attribute: "searchable-attributes",
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
              attribute: "filterable-attributes",
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
              attribute: "sortable-attributes",
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
              attribute: "ranking-rules",
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
              attribute: "synonyms",
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
              attribute: "distinct-attribute",
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
            name: "stopWords",
          },
        },
        { default: () => "Stop Words" }
      ),
    key: "stopWords",
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "typoTolerance",
          },
        },
        { default: () => "Typo Tolerance" }
      ),
    key: "typoTolerance",
  },
];

export default defineComponent({
  name: "MenuComponent",
  setup() {
    return {
      menuOptions,
    };
  },
});
</script>
