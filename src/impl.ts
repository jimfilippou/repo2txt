import type { LocalContext } from "./context";

interface CommandFlags {
  exclude?: string[];
}

export default async function (this: LocalContext, flags: CommandFlags, project: string): Promise<void> {
  const { fs, path } = this;

  const outputFileName = "repo2txt.txt";
  const defaultExcludes = [
    "node_modules",
    "dist",
    ".git",
    ".next",
    ".vscode",
    ".idea",
    ".env",
    "Thumbs.db",
    "yarn.lock",
    "npm-debug.log",
    "pnpm-lock.yaml",
    "package-lock.json",
    outputFileName,
  ];
  const excludeItems = new Set([...defaultExcludes, ...(flags.exclude || [])]);

  const binaryExtensions = new Set([
    ".jpg",
    ".jpeg",
    ".ico",
    ".png",
    ".gif",
    ".bmp",
    ".tiff",
    ".webp",
    ".mp4",
    ".avi",
    ".mov",
    ".wmv",
    ".flv",
    ".webm",
    ".mp3",
    ".wav",
    ".ogg",
    ".flac",
    ".aac",
    ".pdf",
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".zip",
    ".rar",
    ".7z",
    ".tar",
    ".gz",
    ".tgz",
    ".DS_Store",
  ]);

  function getErrorMessage(error: unknown): string {
    return error instanceof Error ? error.message : String(error);
  }

  function shouldExclude(itemPath: string): boolean {
    return excludeItems.has(path.basename(itemPath)) || path.basename(itemPath) === outputFileName;
  }

  function isBinaryFile(filePath: string): boolean {
    return binaryExtensions.has(path.extname(filePath).toLowerCase());
  }

  function getAllFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    try {
      fs.readdirSync(dirPath).forEach(function (item) {
        const itemPath = path.join(dirPath, item);
        if (shouldExclude(itemPath)) return;
        try {
          if (fs.statSync(itemPath).isDirectory()) {
            getAllFiles(itemPath, arrayOfFiles);
          } else {
            arrayOfFiles.push(itemPath);
          }
        } catch (error) {
          console.warn(`Error processing ${itemPath}: ${getErrorMessage(error)}`);
        }
      });
    } catch (error) {
      console.warn(`Unable to read directory ${dirPath}: ${getErrorMessage(error)}`);
    }
    return arrayOfFiles;
  }

  function processFileContent(filePath: string, content: string): string {
    if (isBinaryFile(filePath)) {
      return "[Binary file content not included]";
    }
    // Strip newlines and extra whitespace for text files
    return content.replace(/\s+/g, " ").trim();
  }

  function processProject(projectPath: string): void {
    const outputPath = path.join(projectPath, outputFileName);
    const allFiles = getAllFiles(projectPath);

    let outputContent = "Project Structure:\n";

    const fileContents: { [key: string]: string } = {};
    allFiles.forEach((filePath) => {
      const relativePath = path.relative(projectPath, filePath);
      if (isBinaryFile(filePath)) {
        fileContents[relativePath] = "[Binary file content not included]";
      } else {
        const content = fs.readFileSync(filePath, "utf8");
        fileContents[relativePath] = processFileContent(filePath, content);
      }
    });

    // Generate file tree structure
    Object.keys(fileContents)
      .sort()
      .forEach((filePath) => {
        outputContent += `- ${filePath}\n`;
      });

    outputContent += "\nFile Contents:\n";

    // Add content for all files
    Object.entries(fileContents).forEach(([filePath, content]) => {
      outputContent += `\n--- ${filePath} ---\n`;
      outputContent += content + "\n";
    });

    fs.writeFileSync(outputPath, outputContent);
    console.log(`Repository contents have been written to ${outputPath}`);
  }

  try {
    processProject(project);
  } catch (error) {
    console.error("An error occurred:", getErrorMessage(error));
  }
}
