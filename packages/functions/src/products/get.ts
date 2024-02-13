import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {

  const params = {
    TableName: Table.Products.tableName,
    // 'Key' defines the partition key and sort key of
    // the item to be retrieved
    FilterExpression: 'slug = :slug',
    ExpressionAttributeValues: {
      ":slug": event?.pathParameters?.id
    }
  };

  const result = await dynamoDb.scan(params);
  if (!result.Items) {
    throw new Error("Item not found.");
  }

  // Return the retrieved item
  return JSON.stringify(result.Items[0]);
});
