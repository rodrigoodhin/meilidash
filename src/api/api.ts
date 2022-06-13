import { useServerStore } from "@/stores/server";
import { useIndexStore } from "@/stores/indexes";
export async function callApi(
  endpoint: string,
  method: string,
  data: string,
  index: boolean
) {
  const server = useServerStore();
  const indexStore = useIndexStore();
  const bearer_token = server.getServerData.masterkey;
  const selectedIndex = indexStore.getIndex;

  let domain = server.getServerData.domain;
  if (index) {
    domain = domain + "indexes/" + selectedIndex;
  }
  domain = domain + endpoint;

  let options: RequestInit = {};
  console.log(data);
  if (method == "GET") {
    options = {
      method: method,
      headers: {
        Authorization: "Bearer " + bearer_token,
        "Content-type": "application/json; charset=UTF-8",
      },
    };
  } else if (method == "POST") {
    options = {
      method: method,
      headers: {
        Authorization: "Bearer " + bearer_token,
        "Content-type": "application/json; charset=UTF-8",
      },
      body: data,
    };
  }

  return await fetch(domain, options)
    .then(async (response) => {
      const resData = await response.json();
      if (!response.ok) {
        resData.isSuccess = false;
      }
      return resData;
    })
    .catch((error) => {
      console.log("callApi in api.ts  err");
      console.log(domain);
      console.log(error);
      throw error;
    });
}
