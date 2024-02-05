import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStacks";

export function ApiStack({ stack, app }: StackContext) {
  const { notesTable, profileTable } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [notesTable, profileTable],
      },
    },
    cors: true,
    routes: {
      "GET /session": {
        function: "packages/functions/src/auth/session.handler",
        authorizer: "none",
      },
      //notes
      "POST /notes": "packages/functions/src/notes/create.main",
      "GET /notes/{id}": "packages/functions/src/notes/get.main",
      "GET /notes": "packages/functions/src/notes/list.main",
      "PUT /notes/{id}": "packages/functions/src/notes/update.main",
      "DELETE /notes/{id}": "packages/functions/src/notes/delete.main",

      //profil
      "POST /create-profile":
        "packages/functions/src/profile/confirmation.main",
      "GET /profile/{sub}": "packages/functions/src/profile/get.main",
      "GET /profiles": "packages/functions/src/profile/list.main",
      "PUT /profile": "packages/functions/src/profile/update.main",
      "DELETE /profile": "packages/functions/src/profile/delete.main",
    },
  });

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
