import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStacks";

export function ApiStack({ stack, app }: StackContext) {
  const {
    profileTable,
    productsTable,
    categoriesTable,
    ordersTable,
    artworksTable,
  } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    defaults: {
      authorizer: "iam",
      function: {
        bind: [
          profileTable,
          productsTable,
          categoriesTable,
          ordersTable,
          artworksTable,
        ],
      },
    },
    cors: true,
    routes: {
      //categories
      "GET /categories": {
        function:  "packages/functions/src/categories/list.main",
      authorizer: "none",
    },
      "GET /categories/{id}": {
        function:  "packages/functions/src/categories/get.main",
      authorizer: "none",
    },
      "POST /categories": "packages/functions/src/categories/create.main",
      "PUT /categories/{id}": "packages/functions/src/categories/update.main",
      "DELETE /categories/{id}": "packages/functions/src/categories/delete.main",

      //products
      "GET /products": {
        function: "packages/functions/src/products/list.main",
        authorizer: "none",
      },
      "GET /products/{id}": {
        function: "packages/functions/src/products/get.main",
        authorizer: "none",
      },
      "POST /products": "packages/functions/src/products/create.main",
      "PUT /products/{id}": "packages/functions/src/products/update.main",
      "DELETE /products/{id}": "packages/functions/src/products/delete.main",

      //orders
      "GET /orders":"packages/functions/src/orders/list.main",
      "GET /orders/{id}":"packages/functions/src/orders/get.main",
      "POST /orders": "packages/functions/src/orders/create.main",
      "PUT /orders/{id}": "packages/functions/src/orders/update.main",
      "DELETE /orders/{id}": "packages/functions/src/orders/delete.main",

      //works
      "GET /works": {
        function: "packages/functions/src/works/list.main",
        authorizer: "none",
      },
      "GET /works/{id}": {
        function: "packages/functions/src/works/get.main",
        authorizer: "none",
      }, 
      "POST /works": "packages/functions/src/works/create.main",
      "PUT /works": "packages/functions/src/works/update.main",
      "DELETE /works": "packages/functions/src/works/delete.main",

      //notes
      "POST /notes": "packages/functions/src/notes/create.main",
      "GET /notes/{id}": "packages/functions/src/notes/get.main",
      "GET /notes": "packages/functions/src/notes/list.main",
      "PUT /notes/{id}": "packages/functions/src/notes/update.main",
      "DELETE /notes/{id}": "packages/functions/src/notes/delete.main",

      //profile
      "POST /create-profile":
        "packages/functions/src/profile/confirmation.main",
      "GET /profile/{sub}": "packages/functions/src/profile/get.main",
      "GET /profiles": "packages/functions/src/profile/list.main",
      "PUT /profile": "packages/functions/src/profile/update.main",
      "DELETE /profile": "packages/functions/src/profile/delete.main",
    },
  });

/*   api.setCors({
    allowMethods: ["GET"]
  }) */

  // Show the API endpoint in the output
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  // Return the API resource
  return {
    api,
  };
}
