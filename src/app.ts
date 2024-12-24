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
        brief: "A string of comma-separated file names or directories to exclude",
        parse: String,
      },
    },
    aliases: {
      e: "exclude",
    },
  },
  docs: {
    brief: description,
    customUsage: ["--exclude node_modules,dist,.git", "--exclude node_modules", "--exclude dist"],
  },
});

export const app = buildApplication(command, {
  name,
  versionInfo: {
    currentVersion: version,
  },
});
