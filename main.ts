import { Plugin, MarkdownView, TAbstractFile, PluginSettingTab, App, Setting } from 'obsidian';

class CuboxSettings {
  targetFolder: string = '';
}

class CuboxSettingTab extends PluginSettingTab {
  plugin: CuboxPlugin;

  constructor(app: App, plugin: CuboxPlugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    let { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName('Target folder')
      .setDesc('Enter the path of the folder you want to use.')
      .addText(text => text
        .setValue(this.plugin.settings.targetFolder)
        .onChange(async (value) => {
          this.plugin.settings.targetFolder = value;
          await this.plugin.saveData(this.plugin.settings);
       }));
  }
}

export default class CuboxPlugin extends Plugin {
	settings: CuboxSettings;

	async onload() {
		this.settings = await this.loadData() || new CuboxSettings();
    this.addSettingTab(new CuboxSettingTab(this.app, this));

		this.registerEvent(this.app.vault.on('create', async (file: TAbstractFile) => {
			if (!this.settings.targetFolder) return;
			if (file.name.includes('.md') && file.parent?.path === this.settings.targetFolder) {
				setTimeout(() => {
					const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
					if (!markdownView) return;
					this.batchDelete(markdownView);
				}, 1000);
			}
		}));

		this.addCommand({
			id: 'format-cubox-annotation',
			name: 'Format cubox annotation',
			checkCallback: (checking: boolean) => {
				const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					if (!checking) {
						this.batchDelete(markdownView);
					}
					return true;
				}
				return false;
			}
		});
	}

	batchDelete(markdownView: MarkdownView) {
		const editor = markdownView.editor;
		const doc = editor.getDoc();

		let totalLines = doc.lineCount();
		for (let lineNumber = 0; lineNumber < totalLines; lineNumber++) {
			let line = doc.getLine(lineNumber);
			const matchCubeBox = line.match(/cubox:\/\/(\S*)/);
			const matchWebLink = line.match(/https:\/\/cubox.pro\/my\/highlight\?id=(\S*)/);
			const matchH1 = line.match(/^#\s+/); // Matches h1 tags at the beginning of the line
			console.log(line);
			// Delete the line if it has a link, if it's a h1 tag, or if it's empty
			if (matchCubeBox || matchWebLink || matchH1) {
				doc.replaceRange('', { line: lineNumber, ch: 0 }, { line: lineNumber + 1, ch: 0 });
				lineNumber--;
				totalLines--;
			}
		}

		// Deletes the last line if it has any form of http or https link
		const lastLine = doc.getLine(totalLines - 1);
		const matchLastLineWebLink = lastLine.match(/https?:\/\/(\S*)/); // Matches any form of http or https link

		if (matchLastLineWebLink) {
			doc.replaceRange('', { line: totalLines - 1, ch: 0 }, { line: totalLines, ch: 0 });
		}
	}
}