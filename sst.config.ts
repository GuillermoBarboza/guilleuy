import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStacks";
import { ApiStack } from "./stacks/ApiStacks";
import { AuthStack } from "./stacks/AuthStack";

export default {
  config(_input) {
    return {
      name: "notes",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(ApiStack).stack(AuthStack);
  }
} satisfies SSTConfig;
