import { StackContext, Table, Bucket } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  // Create the DynamoDB table
  const notesTable = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });

  // Create a new DynamoDB table for user profiles
  const profileTable = new Table(stack, "UserProfiles", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
    // Optionally, you can add more attributes based on your profile requirements
    // e.g., email, name, etc. These can be managed as non-key attributes
  });

  const aboutTable = new Table(stack, "About", {
    fields: {
      userId: "string",
    },
    primaryIndex: { partitionKey: "userId" },
    // Optionally, you can add more attributes based on your profile requirements
    // e.g., email, name, etc. These can be managed as non-key attributes
  });

  //portfolio stuff
  const artworksTable = new Table(stack, "Works", {
    fields: {
      workId: "string",
    },
    primaryIndex: { partitionKey: "workId" },
  });

  // Adding a Products table
  const productsTable = new Table(stack, "Products", {
    fields: {
      productId: "string",
    },
    primaryIndex: { partitionKey: "productId" },
  });

  // Adding a Categories table
  const categoriesTable = new Table(stack, "Categories", {
    fields: {
      categoryId: "string",
      // Additional fields for category details can be added here
    },
    primaryIndex: { partitionKey: "categoryId" },
    // Consider global secondary indexes if you need to support complex queries
  });

  // New Orders table from the previous suggestion
  const ordersTable = new Table(stack, "Orders", {
    fields: {
      orderId: "string",
    },
    primaryIndex: { partitionKey: "orderId" },
  });

  // Create an S3 bucket
  const bucket = new Bucket(stack, "Uploads", {
    cors: [
      {
        maxAge: "1 day",
        allowedOrigins: ["*"],
        allowedHeaders: ["*"],
        allowedMethods: ["GET", "PUT", "POST", "DELETE", "HEAD"],
      },
    ],
  });

  return {
    bucket,
    profileTable,
    productsTable,
    categoriesTable,
    ordersTable,
    artworksTable,
  };
}
