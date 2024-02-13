import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
 /*  const params = {
    TableName: Table.Works.tableName,
    // 'Key' defines the partition key and sort key of
    // the item to be retrieved
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the author
    },
  };

  const result = await dynamoDb.get(params);
  if (!result.Item) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item */
  return JSON.stringify('result.Item');
});
