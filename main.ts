import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";
import config from "./config.ts";

type Word = string
type WordList = Word[]

const readSources = (fileName: string): WordList => {
  const path = join(config.inputSourcesPath, fileName);
  const inputSource = Deno.readTextFileSync(path);
  const inputs = inputSource.split("\n");

  return inputs;
};

const generateRandomNames = (sources: WordList[]): Word[] => {
  if (sources.length === 0) {
    throw new Error(`Received an empty word list. Does the path ${config.inputSourcesPath} contain any word list files?`)
  }

  if (sources.length === 1) {
    return sources[0];
  }

  return sources[0].flatMap((input) =>
    generateRandomNames(sources.slice(1, sources.length)).map((nextSource) => [input, nextSource].join(" "))
  );
};

async function main({ output }: { output?: string }) {
  const files = Array.from(await Deno.readDirSync(config.inputSourcesPath))
    .filter((file) => file.isFile)
    .sort((a, b) => a.name.localeCompare(b.name));

  const inputs = files.map((file) => readSources(file.name));
  const randomNames = generateRandomNames(inputs).join("\n");

  console.log(randomNames)

  if (output) {
    Deno.writeTextFileSync(output, randomNames);
  }
}

await new Command()
  .name("random-name-generator")
  .description("A simple random name generator")
  .version("v1.0.0")
  .option("-o, --output <filename>", "Where to save the randomly generated names", {
    default: "",
  })
  .action(({ output }) => {
    main({
      output,
    });
  })
  .parse();
