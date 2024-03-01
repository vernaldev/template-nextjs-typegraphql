import { isBuiltin } from "node:module"
import { dirname } from "node:path"
import { promisify } from "node:util"
import { fileURLToPath, pathToFileURL } from "node:url"
import resolveCallback from "resolve"
import { resolve as resolveTs, load } from "ts-node/esm"
import { loadConfig, createMatchPath } from "tsconfig-paths"

const resolveAsync = promisify(resolveCallback)
const tsExtensions = new Set([".tsx", ".ts", ".mts", ".cts"])

const { absoluteBaseUrl, paths } = loadConfig()
const matchPath = createMatchPath(absoluteBaseUrl, paths)

const resolve = async (specifier, ctx, defaultResolve) => {
  const { parentURL = pathToFileURL(absoluteBaseUrl) } = ctx

  if (isBuiltin(specifier)) {
    return defaultResolve(specifier, ctx)
  }

  if (specifier.startsWith("file://")) {
    specifier = fileURLToPath(specifier)
  }

  try {
    const resolution = await resolveAsync(matchPath(specifier) || specifier, {
      basedir: dirname(fileURLToPath(parentURL)),
      // For whatever reason, --experimental-specifier-resolution=node doesn't search for .mjs extensions
      // but it does search for index.mjs files within directories
      extensions: [".js", ".json", ".node", ".mjs", ...tsExtensions],
    })

    return resolveTs(pathToFileURL(resolution).href, ctx, defaultResolve)
  } catch (error) {
    if (error.code === "MODULE_NOT_FOUND") {
      // Match Node's error code
      error.code = "ERR_MODULE_NOT_FOUND"
    }
    throw error
  }
}

export { resolve, load }
