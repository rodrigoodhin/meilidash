import { MeiliSearch } from "meilisearch";
import { useServerStore } from "@/stores/server";
import { useIndexStore } from "@/stores/indexes";

export async function callApi() {
  const server = useServerStore();
  const indexStore = useIndexStore();
  const apiKey = server.getServerData.masterkey;
  const selectedIndex = indexStore.getIndex;
  const domain = server.getServerData.domain;

  const client = new MeiliSearch({
    host: domain,
    apiKey: apiKey,
  });

  const index = client.index(selectedIndex);

  return { client, index };
}
