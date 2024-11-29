// a script to pasrse a .txt file having a word in each line and then write the words in a .json file
// Usage: node test.js <input.txt> <output.json>

const fs = require("fs");

const input = process.argv[2];
const output = process.argv[3];

const data = fs.readFileSync(input, "utf8");
const words = data
  .split("\n")
  .map((word) => word.replace("\r", ""))
  .filter((word) => word !== "");

const json = JSON.stringify(words, null, 2);

fs.writeFileSync(output, json);
console.log("File written successfully");
