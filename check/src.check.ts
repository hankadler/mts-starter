import fs from "fs";
import { greet } from "../src/index";

const _ = greet;
const codePath = "check/code";
const code = fs.readFileSync(codePath, "utf-8");

eval(code);
