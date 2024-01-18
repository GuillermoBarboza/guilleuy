import * as uuid from "uuid";
import { Table } from "sst/node/table";
import dynamoDb from "@notes/core/dynamodb";

export const main = ( async (event: any) => {
  const userId = event.request.userAttributes.sub;
  const email = event.request.userAttributes.email;

  let data = {
    username: "",
    email: email || "",
    profilePictureUrl: "",
    // ... other profile fields ...
  }; 

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: userId,
      profileId: uuid.v1(),
      username: data.username,
      email: data.email,
      profilePictureUrl: data.profilePictureUrl,
      createdAt: Date.now(),
      // ... other profile attributes ...
    },
  };

  await dynamoDb.put(params);

  return event;
});
