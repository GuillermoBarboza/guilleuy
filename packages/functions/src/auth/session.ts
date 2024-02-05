import { Table } from "sst/node/table";
import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import dynamoDb from "@notes/core/dynamodb";

export const handler = ApiHandler(async () => {
  const session = useSession();

  // Check user is authenticated
  if (session.type !== "user") {
    throw new Error("Not authenticated");
  }

  const data = await dynamoDb.get({
    TableName: Table.UserProfiles.tableName,
    Key: {
      userId: session.properties.userID,
    },
  });

  return {
    statusCode: 200,
    body: JSON.stringify(data.Item!),
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
      },
  };
});
