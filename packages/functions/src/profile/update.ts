import { Table } from "sst/node/table";
import handler from "@notes/core/handler";
import dynamoDb from "@notes/core/dynamodb";

export const main = handler(async (event) => {
  const data = JSON.parse(event.body || "{}");

  const params = {
    //@ts-ignore
    TableName: Table.UserProfiles.tableName,
    Key: {
      // The attributes of the item to be created
      userId: data.sub, // The id of the author
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET username = :username, email = :email, profilePictureUrl = :profilePictureUrl",
    ExpressionAttributeValues: {
      ":email": data.profile.email || null,
      ":username": data.profile.username || null,
      ":profilePictureUrl": data.profile.profilePictureUrl || null,
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW",
  };
try {
  
  const result = await dynamoDb.update(params);
  return JSON.stringify({result: data});
} catch (error) {
  
  return JSON.stringify({result: error});
}

});