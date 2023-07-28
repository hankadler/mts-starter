const fs = require("fs");
const { greet } = require("../build/index.cjs");

const _ = greet
const codePath = "check/code";
const code = fs.readFileSync(codePath, "utf-8");

eval(code);
