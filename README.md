# Obsidian Cubox Plugin

## Introduction

The Obsidian Cubox Plugin is designed to enhance your note-taking experience by formatting Cubox exported annotation markdown content for use within Obsidian. With this plugin, you can seamlessly integrate your annotations into your Obsidian knowledge base for further analysis and reference.

## Features

- Automatic formatting of new markdown files created from Cubox exports within a specified folder.
- Manual invocation of the format function using the command palette.

## Installation

Before installing this plugin, ensure you have the Obsidian application installed on your computer.

### Manual Installation

To install the plugin manually, follow these steps:

1. Go to the [Releases](https://github.com/xdlrt/obsidian-cubox/releases) page of this repository and download the latest version.
2. In your Obsidian vault, navigate to the `.obsidian/plugins` directory.
3. If it doesn't exist already, create a subdirectory called `obsidian-cubox`.
4. Extract and copy `main.js`, `styles.css`, and `manifest.json` from the downloaded zip file into the `obsidian-cubox` subdirectory.

### Enabling the Plugin

Once the files are in place:

1. Open Obsidian.
2. Go to `Settings` > `Community Plugins`.
3. Disable `Safe mode`.
4. Navigate to the plugin's listing.
5. Click `Enable` next to the plugin.

## Usage

### Automatic Formatting

The plugin will automatically format any new markdown files created within the specified `targetFolder`. Make sure to specify the target folder in the plugin's settings within Obsidian.

### Manual Formatting

To manually format a Cubox annotation:

1. Open the command palette using `Ctrl/Cmd + P`.
2. Type and select `Format cubox annotation`. The plugin will format the current file according to the predefined rules.

## Support

If you encounter any issues or have feature suggestions, please submit an issue on the [GitHub repository](https://github.com/xdlrt/obsidian-cubox/issues).

## Contributing

Contributions to improve the Obsidian Cubox Plugin are welcome! Please refer to our [contribution guidelines](https://github.com/xdlrt/obsidian-cubox/CONTRIBUTING.md) for more information.

## License

This project is licensed under [MIT License](https://github.com/your-username/obsidian-cubox-plugin/LICENSE) - see the LICENSE file for details.
