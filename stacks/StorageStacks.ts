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
    notesTable,
    profileTable
  };
}
