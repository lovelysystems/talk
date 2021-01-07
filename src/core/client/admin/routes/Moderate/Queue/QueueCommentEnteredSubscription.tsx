import { graphql } from "react-relay";
import { Environment, RecordSourceSelectorProxy } from "relay-runtime";

import { getQueueConnection } from "coral-admin/helpers";
import {
  createSubscription,
  requestSubscription,
  SubscriptionVariables,
} from "coral-framework/lib/relay";
import { GQLMODERATION_QUEUE_RL } from "coral-framework/schema";

import { QueueCommentEnteredSubscription } from "coral-admin/__generated__/QueueCommentEnteredSubscription.graphql";

function handleCommentEnteredModerationQueue(
  store: RecordSourceSelectorProxy<unknown>,
  queue: GQLMODERATION_QUEUE_RL
) {
  const rootField = store.getRootField("commentEnteredModerationQueue");
  if (!rootField) {
    return;
  }
  const comment = rootField.getLinkedRecord("comment")!;
  const commentID = comment.getValue("id")!;
  const edgeID = `edge-${commentID}`;
  const edgeInQueue = Boolean(store.get(edgeID));
  if (edgeInQueue) {
    // Comment edge already in the queue, ignore it as it might be just expected race condition,
    // unless the server is sending the same response multiple times.
    return;
  }
  comment.setValue(true, "enteredLive");
  const commentsEdge = store.create(edgeID, "CommentsEdge");
  commentsEdge.setValue(comment.getValue("createdAt"), "cursor");
  commentsEdge.setLinkedRecord(comment, "node");
  const connection = getQueueConnection(store, queue);

  if (connection) {
    const linked = connection.getLinkedRecords("viewNewEdges") || [];
    connection.setLinkedRecords(linked.concat(commentsEdge), "viewNewEdges");
  }
}

const QueueSubscription = createSubscription(
  "subscribeToQueueCommentEntered",
  (
    environment: Environment,
    variables: SubscriptionVariables<QueueCommentEnteredSubscription>
  ) =>
    requestSubscription(environment, {
      subscription: graphql`
        subscription QueueCommentEnteredSubscription(
          $storyID: ID
          $siteID: ID
          $section: SectionFilter
          $orderBy: COMMENT_SORT
          $queue: MODERATION_QUEUE!
        ) {
          commentEnteredModerationQueue(
            storyID: $storyID
            siteID: $siteID
            section: $section
            orderBy: $orderBy
            queue: $queue
          ) {
            comment {
              id
              createdAt
              ...ModerateCardContainer_comment
            }
          }
        }
      `,
      variables,
      updater: (store) => {
        handleCommentEnteredModerationQueue(store, variables.queue);
      },
    })
);

export default QueueSubscription;
