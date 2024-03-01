import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const srcDirectory = join(__dirname, "..", "..", "..");

export const resolve = (...path: string[]) => {
  return join(srcDirectory, ...path);
};

export const require = createRequire(import.meta.url);
