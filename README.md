# @jimfilippou/repo2txt

A dead simple CLI tool to convert any project folder into a text file, useful for AI prompts, documentation, and more.

[![npm version](https://img.shields.io/npm/v/@jimfilippou/repo2txt.svg)](https://www.npmjs.com/package/@jimfilippou/repo2txt)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start

Run `repo2txt` without installation using these one-liners:

```bash
# Using npx (npm)
npx @jimfilippou/repo2txt /path/to/your/project

# Using pnpm dlx
pnpm dlx @jimfilippou/repo2txt /path/to/your/project

# Using yarn dlx
yarn dlx @jimfilippou/repo2txt /path/to/your/project

# Using bun
bun x @jimfilippou/repo2txt /path/to/your/project
```

## Features

- Convert an entire repository into a single text file
- Exclude specific directories or files
- Handles binary files gracefully
- Easy to use CLI interface

## Installation

You can install `@jimfilippou/repo2txt` globally using npm, yarn, pnpm, or bun.

### npm

```bash
npm install -g @jimfilippou/repo2txt
```

### yarn

```bash
yarn global add @jimfilippou/repo2txt
```

### pnpm

```bash
pnpm add -g @jimfilippou/repo2txt
```

### bun

```bash
bun add -g @jimfilippou/repo2txt
```

## Usage

After installation, you can use the `repo2txt` command to convert a repository to a text file.

### Basic Usage

```bash
repo2txt /path/to/your/project
```

This will create a `repo2txt.txt` file in the specified project directory.

### Excluding Directories

You can exclude specific directories using the `--exclude` flag:

```bash
repo2txt /path/to/your/project --exclude node_modules dist .git
```

### Default Excludes

The tool automatically excludes the following directories and files:

```
node_modules, dist, .git, .next, .vscode, .idea, .env, Thumbs.db,
yarn.lock, npm-debug.log, pnpm-lock.yaml, package-lock.json, repo2txt.txt
```

## Output

The generated `repo2txt.txt` file will contain:

1. A project structure overview
2. The contents of each file (excluding binary files)

Binary files will be noted but their contents will not be included.

## Use Cases

- Generate comprehensive project overviews for AI prompts
- Create documentation snapshots
- Easily share project structures and contents

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Dimitrios Filippou <info@jimfilippou.com>

## Support

If you encounter any issues or have questions, please [open an issue](https://github.com/jimfilippou/repo2txt/issues) on GitHub.
