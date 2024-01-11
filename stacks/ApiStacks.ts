import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStacks";
import { AuthStack } from "./AuthStack";

export function ApiStack({ stack, app }: StackContext) {
  const { table } = use(StorageStack);
  const { auth } = use(AuthStack); // Use the AuthStack

  // Create the API
  const api = new Api(stack, "Api", {
    customDomain: app.stage === "prod" ? `api.${app.stage}.guille.uy` : undefined,
    defaults: {
      authorizer: "iam",
      function: {
        bind: [table],
      },
    },
    cors: true,
    routes: {
      "POST /notes": "packages/functions/src/create.main",
      "GET /notes/{id}": "packages/functions/src/get.main",
      "GET /notes": "packages/functions/src/list.main",
      "PUT /notes/{id}": "packages/functions/src/update.main",
      "DELETE /notes/{id}": "packages/functions/src/delete.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.customDomainUrl || api.url,
  });

  // Return the API resource
  return {
    api,
  };
}