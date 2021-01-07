import {
  ConnectionHandler,
  RecordProxy,
  RecordSourceProxy,
  RecordSourceSelectorProxy,
} from "relay-runtime";

import { GQLMODERATION_QUEUE_RL } from "coral-framework/schema";

export default function getQueueConnection(
  store: RecordSourceSelectorProxy | RecordSourceProxy,
  queue: GQLMODERATION_QUEUE_RL | "REJECTED" | "APPROVED"
): RecordProxy | null | undefined {
  const root = store.getRoot();
  if (queue === "REJECTED") {
    return ConnectionHandler.getConnection(root, "RejectedQueue_comments");
  }
  if (queue === "APPROVED") {
    return ConnectionHandler.getConnection(root, "ApprovedQueue_comments");
  }
  const queuesRecord = root.getLinkedRecord("moderationQueues")!;
  if (!queuesRecord) {
    return undefined;
  }

  const queueRecord = queuesRecord.getLinkedRecord(queue.toLowerCase());
  if (!queueRecord) {
    return undefined;
  }

  return ConnectionHandler.getConnection(queueRecord, "Queue_comments");
}
