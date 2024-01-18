import { ApiStack } from "./ApiStacks";
import * as iam from "aws-cdk-lib/aws-iam";
import { StorageStack } from "./StorageStacks";
import { Cognito, StackContext, use } from "sst/constructs";

export function AuthStack({ stack, app }: StackContext) {
  const { api } = use(ApiStack);
  const { bucket, profileTable } = use(StorageStack);

  // Create a Cognito User Pool and Identity Pool
  const auth = new Cognito(stack, "Auth", {
    login: ["email"],
    triggers: {
      postConfirmation: {
        handler: "packages/functions/src/profile/confirmation.main",
        environment: { tableName: profileTable.tableName },
        permissions: [profileTable],
      },
    },
  });

  auth.attachPermissionsForAuthUsers(stack, [
    // Allow access to the API
    api,
    // Policy granting access to a specific folder in the bucket
    new iam.PolicyStatement({
      actions: ["s3:*"],
      effect: iam.Effect.ALLOW,
      resources: [
        bucket.bucketArn + "/private/${cognito-identity.amazonaws.com:sub}/*",
      ],
    }),
  ]);

  // Show the auth resources in the output
  stack.addOutputs({
    Region: app.region,
    UserPoolId: auth.userPoolId,
    UserPoolClientId: auth.userPoolClientId,
    IdentityPoolId: auth.cognitoIdentityPoolId,
  });

  // Return the auth resource
  return {
    auth,
  };
}
