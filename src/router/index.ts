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
          component: () =>
            import("@/components/settings/DisplayedAttributes.vue"),
        },
        {
          path: "searchable",
          name: "searchable",
          component: () =>
            import("@/components/settings/SearchableAttributes.vue"),
        },
        {
          path: "filterable",
          name: "filterable",
          component: () =>
            import("@/components/settings/FilterableAttributes.vue"),
        },
        {
          path: "sortable",
          name: "sortable",
          component: () =>
            import("@/components/settings/SortableAttributes.vue"),
        },
        {
          path: "rankingRules",
          name: "rankingRules",
          component: () => import("@/components/settings/RankingRules.vue"),
        },
        {
          path: "synonyms",
          name: "synonyms",
          component: () => import("@/components/settings/Synonyms.vue"),
        },
        {
          path: "distinct",
          name: "distinct",
          component: () =>
            import("@/components/settings/DistinctAttribute.vue"),
        },
        {
          path: "typoTolerance",
          name: "typoTolerance",
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
() => import("@/components/settings/DisplayedAttributes.vue");
