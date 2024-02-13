import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  const params = {
    TableName: Table.Works.tableName
  };
  try {
    
  const result = await dynamoDb.scan(params);

  // Return the matching list of items in response body
  return JSON.stringify(result.Items);
  
  } catch (error) {
     // Return the matching list of items in response body
  return JSON.stringify({error: error});

  }
});