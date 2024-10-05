import type { CommandContext } from "@stricli/core";
import path from "node:path";
import fs from "node:fs";
import os from "node:os";

export interface LocalContext extends CommandContext {
  readonly process: NodeJS.Process;
  readonly os: typeof os;
  readonly fs: typeof fs;
  readonly path: typeof path;
}

export function buildContext(process: NodeJS.Process): LocalContext {
  return {
    process,
    os,
    fs,
    path,
  };
}
