import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  // Ensure that you have the correct key structure for the UserProfile table
  // Assuming the primary key of your UserProfile table is `userId`
  const params = {
    TableName: Table.UserProfiles.tableName,
    Key: {
      userId: event.requestContext.authorizer?.iam.cognitoIdentity.identityId, // The id of the user
    },
  };

  // Perform the delete operation on the DynamoDB table
  await dynamoDb.delete(params);

  return JSON.stringify({ status: true });
});
