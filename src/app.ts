import { buildApplication, buildCommand } from "@stricli/core";
import { name, version, description } from "../package.json";

const command = buildCommand({
  loader: async () => import("./impl"),
  parameters: {
    positional: {
      kind: "tuple",
      parameters: [
        {
          brief: "The repository path",
          parse: String,
        },
      ],
    },
    flags: {
      exclude: {
        kind: "parsed",
        optional: true,
        variadic: true,
        brief: "List of directories to exclude",
        parse: String,
      },
    },
  },
  docs: {
    brief: description,
  },
});

export const app = buildApplication(command, {
  name,
  versionInfo: {
    currentVersion: version,
  },
});
