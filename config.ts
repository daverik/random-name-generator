import { config as dotenvConfig } from "https://deno.land/x/dotenv/mod.ts"
import * as z from "https://deno.land/x/zod@v3.14.4/mod.ts"

const variables = dotenvConfig()

const configObj = z.object({
  inputSourcesPath: z.string({
    required_error: "Must specify where to read input sources from"
  })
}).safeParse({
  inputSourcesPath: variables.INPUT_SOURCES_PATH
})

if (!configObj.success) {
  // TODO: Pretty print errors here
  console.log(configObj.error)

  Deno.exit(1)
}

export default configObj.data