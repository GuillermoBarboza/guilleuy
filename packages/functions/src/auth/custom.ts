import { AuthHandler, GoogleAdapter, Session } from "sst/node/auth";
import dynamoDb from "@notes/core/dynamodb";
import { Table } from "sst/node/table";

declare module "sst/node/auth" {
  export interface SessionTypes {
    user: {
      userID: string;
    };
  }
}

export const handler = AuthHandler({
  providers: {
    google: GoogleAdapter({
      mode: "oidc",
      clientID:
        process.env.GOOGLE_ID,
      onSuccess: async (tokenset) => {
        const claims = tokenset.claims();

        let result = await dynamoDb.get({
          TableName: Table.UserProfiles.tableName,
          Key: {
            userId: claims.sub,
          },
        });
      
        if (!result.Item) {
          const params = {
            TableName: Table.UserProfiles.tableName,
            Item: {
              userId: claims.sub,
              username: claims.nickname || claims.given_name || '',
              email: claims.email,
              profilePictureUrl: claims.profilePictureUrl || '',
              createdAt: Date.now(),
              // ... other profile attributes ...
            },
          };
        
          result = await dynamoDb.put(params);
        }

        return Session.parameter({
          redirect: process.env.siteUrl,
          type: "user",
          properties: {
            userID: claims.sub,
          },
        });
      },
    }),
  },
});
