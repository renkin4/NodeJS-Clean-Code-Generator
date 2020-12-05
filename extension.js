// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const fs = require("fs");
const path = require('path'); 

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let folderPath = vscode.workspace.workspaceFolders;
	let rootFolderPath = folderPath[0].uri.fsPath;
 
	console.log('Congratulations, your extension "nodejs-clean-code-generator" is now active!');

	let disposable = vscode.commands.registerCommand('nodejs-clean-code-generator.createNodeJSCleanStructure', async function () {
		let choosenPath = await vscode.window.showInputBox({prompt: "Folder Path", value : path.join(rootFolderPath, "src")});
		let name = await vscode.window.showInputBox({prompt: "Structure Name"});

		let upperCaseName = name[0].toUpperCase() + name.substring(1);


		vscode.window.showInformationMessage('Hello World from NodeJS Clean Code Generator!');
	});

	context.subscriptions.push(disposable);
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
