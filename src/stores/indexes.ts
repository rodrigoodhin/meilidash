import { defineStore } from "pinia";

export const useIndexStore = defineStore("index", {
  state: () => ({
    index: "",
  }),
  getters: {
    getIndex(state) {
      if (state.index == "") {
        if (localStorage.getItem("index") != "") {
          state.index = String(localStorage.getItem("index"));
          return state.index;
        }
      }
      return state.index;
    },
  },
  actions: {
    setIndex(index: string) {
      this.index = index;
      localStorage.setItem("index", index);
    },
  },
});
