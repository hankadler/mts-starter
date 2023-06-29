import fs from "fs/promises";
import path from "path";
import url from "url";

const projectDir = path.resolve(path.dirname(url.fileURLToPath(import.meta.url)), "..");
const typeDirs = [
  `${projectDir}/types`,
  `${projectDir}/dist/types`
];
const outputFilePath = `${projectDir}/dist/index.d.ts`;

async function mergeDeclarationFiles() {
  try {
    const nonEmptyDirs = await filterOutEmptyDirs(typeDirs)
    const declarationFiles = await getDeclarationFiles(nonEmptyDirs);
    const mergedDeclarations = await readDeclarationFiles(declarationFiles);
    const mergedContent = mergedDeclarations.join("\n\n");
    await fs.writeFile(outputFilePath, mergedContent);
    console.log("\nMerged declaration files");
  } catch (error) {
    console.error("Error merging declaration files:", error);
  }
}

async function filterOutEmptyDirs(array) {
  const filteredPaths = await Promise.all(array.map(async (path) => {
    try {
      const stats = await fs.stat(path);
      if (stats.isDirectory()) {
        return path;
      }
    } catch (error) {
      console.warn(`\n${path} does not exist!`);
    }
    return null;
  }));

  return filteredPaths.filter(path => path !== null);
}

async function getDeclarationFiles(dirs) {
  const declarationFiles = [];
  for (const dir of dirs) {
    await findDeclarationFiles(dir, declarationFiles);
  }
  return declarationFiles;
}

async function findDeclarationFiles(dir, declarationFiles) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const fileStat = await fs.stat(filePath);
    if (fileStat.isDirectory()) {
      await findDeclarationFiles(filePath, declarationFiles);
    } else if (filePath.endsWith(".d.ts")) {
      declarationFiles.push(filePath);
    }
  }
}

async function readDeclarationFiles(files) {
  const exportedStatements = [];
  for (const file of files) {
    const fileContent = await fs.readFile(file, "utf-8");
    const statements = extractStatements(fileContent);
    exportedStatements.push(...statements);
  }
  return exportedStatements;
}

function extractStatements(content) {
  const lines = content.split(/\r?\n/);
  const exportedStatements = [];
  let currentStatement = "";
  let braceCount = 0;

  for (const line of lines) {
    const trimmedLine = line.trim();

    if (
      (trimmedLine.startsWith("export class") ||
        trimmedLine.startsWith("export interface") ||
        trimmedLine.startsWith("export type") ||
        trimmedLine.startsWith("export enum") ||
        trimmedLine.startsWith("export default")) &&
      braceCount === 0
    ) {
      if (currentStatement !== "") {
        exportedStatements.push(currentStatement);
      }
      currentStatement = removeDefaultKeyword(trimmedLine);
      currentStatement = removeRedundantExport(currentStatement);
      if (trimmedLine.endsWith("{")) {
        braceCount++;
      }
    } else if (currentStatement !== "") {
      currentStatement += "\n" + line;
      braceCount += countOpeningBraces(line);
      braceCount -= countClosingBraces(line);

      if (braceCount === 0) {
        exportedStatements.push(currentStatement);
        currentStatement = "";
      }
    }
  }

  return exportedStatements.map((statement) => statement.trim()).filter(Boolean);
}

function removeDefaultKeyword(line) {
  return line.replace(/^export\s+default\s+/, "export ");
}

function removeRedundantExport(line) {
  return line.replace(/^export\s+\w+;/, "");
}

function countOpeningBraces(line) {
  const openingBraces = line.match(/{/g);
  return openingBraces ? openingBraces.length : 0;
}

function countClosingBraces(line) {
  const closingBraces = line.match(/}/g);
  return closingBraces ? closingBraces.length : 0;
}

await mergeDeclarationFiles();
