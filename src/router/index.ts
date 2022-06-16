import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/settings/",
      name: "settings",
      component: () => import("../views/SettingsView.vue"),
      children: [
        {
          path: "displayed",
          name: "displayed",
          props: {
            attribute: "displayed-attributes",
            label: "Displayed Attribute",
          },
          component: () => import("@/components/settings/FormAttributes.vue"),
        },
        {
          path: "searchable",
          name: "searchable",
          props: {
            attribute: "searchable-attributes",
            label: "Searchable Attribute",
          },
          component: () => import("@/components/settings/FormAttributes.vue"),
        },
        {
          path: "filterable",
          name: "filterable",
          props: {
            attribute: "filterable-attributes",
            label: "Filterable Attribute",
          },
          component: () => import("@/components/settings/FormAttributes.vue"),
        },
        {
          path: "sortable",
          name: "sortable",
          props: {
            attribute: "sortable-attributes",
            label: "Sortable Attribute",
          },
          component: () => import("@/components/settings/FormAttributes.vue"),
        },
        {
          path: "rankingRules",
          name: "rankingRules",
          props: { attribute: "ranking-rules", label: "Ranking Rules" },
          component: () => import("@/components/settings/FormAttributes.vue"),
        },
        {
          path: "synonyms",
          name: "synonyms",
          props: { attribute: "synonyms", label: "Synonyms" },
          component: () => import("@/components/settings/Synonyms.vue"),
        },
        {
          path: "distinct",
          name: "distinct",
          props: {
            attribute: "distinct-attribute",
            label: "Distinct Attribute",
          },
          component: () => import("@/components/settings/FormAttributes.vue"),
        },
        {
          path: "stopWords",
          name: "stopWords",
          props: { attribute: "stop-words", label: "Stop Words" },
          component: () => import("@/components/settings/FormAttributes.vue"),
        },
        {
          path: "typoTolerance",
          name: "typoTolerance",
          props: { attribute: "typo-tolerance", label: "Typo Tolerance" },
          component: () => import("@/components/settings/TypoTolerance.vue"),
        },
        // ...other sub routes
      ],
    },
    {
      path: "/search",
      name: "search",
      component: () => import("../views/SearchView.vue"),
    },
  ],
});

export default router;
