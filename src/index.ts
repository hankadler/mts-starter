import { fileURLToPath } from "url";
import greet from "./greet";

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  greet(process.argv[2]);
}
