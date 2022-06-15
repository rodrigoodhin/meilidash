import { callApi } from "@/api/api";
import type { Task } from "meilisearch";

export async function checkEndedTask(uid: number): Promise<Task> {
  const { client } = await callApi();
  const task: Task = await client.getTask(uid);

  if (
    task !== undefined &&
    (task.status === "enqueued" || task.status === "processing")
  ) {
    return checkEndedTask(uid);
  }

  return task;
}
