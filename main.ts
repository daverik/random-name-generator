import { Command } from "https://deno.land/x/cliffy/command/mod.ts";
import { readAll } from "https://deno.land/std/streams/conversion.ts";

type Word = string;
type WordList = Word[];

const generateRandomNames = (wordLists: WordList[]): Word[] => {
  if (wordLists.length === 0) {
    throw new Error(`Received an empty word list.`);
  }

  if (wordLists.length === 1) {
    return wordLists[0];
  }

  return wordLists[0].flatMap((word) =>
    generateRandomNames(wordLists.slice(1, wordLists.length)).map((nextWord) => [word, nextWord].join(" "))
  );
};

async function main({ filePath, output }: { filePath?: string; output?: string }) {
  let words;

  if (filePath) {
    const file = Deno.readTextFileSync(filePath);
    words = file;
  } else {
    const stdinContent = await readAll(Deno.stdin);
    const response = new TextDecoder().decode(stdinContent);
    words = response;
  }

  const wordLists = words.split("\n\n").map((wordList) => wordList.split("\n"));
  const randomNames = generateRandomNames(wordLists).join("\n");

  console.log(randomNames);

  if (output) {
    Deno.writeTextFileSync(output, randomNames);
  }
}

await new Command()
  .name("random-name-generator")
  .description("A simple random name generator.")
  .arguments("[file]")
  .version("v1.0.0")
  .option("-o, --output <filename>", "Where to save the randomly generated names", {
    default: "",
  })
  .action(({ output }, filePath) => {
    main({
      output,
      filePath,
    });
  })
  .parse();
