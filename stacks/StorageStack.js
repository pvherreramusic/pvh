import { Bucket, Table } from "@serverless-stack/resources";

export function StorageStack({ stack }) {
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

  // Create the DynamoDB table
  const table = new Table(stack, "Links", {
    fields: {
      userId: "string",
      linkId: "string",
    },
    primaryIndex: { partitionKey: "userId", sortKey: "linkId" },
  });

  // Return the bucket and table resources
  return {
    table,
    bucket,
  };
}
