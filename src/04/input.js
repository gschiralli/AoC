import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const input = fs.readFileSync(
  path.join(__dirname, "input.txt"),
  "utf-8"
);
