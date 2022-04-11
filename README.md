# Random name generator

Generates random names from two or more lists of words. Written in Deno.

## Example

Given the input:

```
Fire
Water
Earth
Wind

Plant
Cactus
Tulip
```


The output is:

```
Fire Plant
Fire Cactus
Fire Tulip
Water Plant
Water Cactus
Water Tulip
Earth Plant
Earth Cactus
Earth Tulip
Wind Plant
Wind Cactus
Wind Tulip
```

## Usage

deno run --allow-read main.ts example_words.txt

You can optionally pass the --output argument to write the names to a file
See --help for more info

By default, the input sources area sorted by their file names