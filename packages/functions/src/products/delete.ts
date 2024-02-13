import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {

  const params = {
    TableName: Table.Products.tableName,
    Key: {
        productId: event?.pathParameters?.id
    },
  };

  await dynamoDb.delete(params);

  return JSON.stringify({ status: true });
});