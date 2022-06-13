import { defineStore } from "pinia";

export interface ServerType {
  domain: string;
  masterkey: string;
}

export const useServerStore = defineStore("server", {
  state: () => ({
    server: {
      domain: "",
      masterkey: "",
    },
  }),
  getters: {
    getServerData(state) {
      if (state.server.domain == "") {
        if (localStorage.getItem("domain") != "") {
          state.server.domain = String(localStorage.getItem("domain"));
        }
      }
      if (state.server.masterkey == "") {
        if (localStorage.getItem("masterkey") != "") {
          state.server.masterkey = String(localStorage.getItem("masterkey"));
        }
      }
      return state.server;
    },
  },
  actions: {
    setServerData(server: ServerType) {
      this.server.domain = server.domain;
      localStorage.setItem("domain", this.server.domain);

      this.server.masterkey = server.masterkey;
      localStorage.setItem("masterkey", this.server.masterkey);
    },
  },
});
