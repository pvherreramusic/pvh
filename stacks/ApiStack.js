import { Api, use } from "@serverless-stack/resources";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack, app }) {
  const { table } = use(StorageStack);

  // Create the API
  const api = new Api(stack, "Api", {
    customDomain: app.stage === "prod" ? "notes-api.seed-demo.club" : undefined,
    defaults: {
      function: {
        permissions: [table],
        environment: {
          TABLE_NAME: table.tableName,

        },
      },
    },
    routes: {
      "GET    /links": "functions/list.main",
      "POST   /links": "functions/create.main",
      "GET    /links/{id}": "functions/get.main",
      "PUT    /links/{id}": "functions/update.main",
      "DELETE /links/{id}": "functions/delete.main",
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
