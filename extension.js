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

		let useCasesFolder = path.join(choosenPath, `use_cases`);
		let entityFolder = path.join(choosenPath, `entity`);
		let controllerFolder = path.join(choosenPath, `controller`);

		let useCasesFolderPath = path.join(useCasesFolder, `${name}`);
		let entityFolderPath = path.join(entityFolder, `${name}`);
		let controllerFolderPath = path.join(controllerFolder, `${name}`);

		let errorHandler = (err) => {
			if(err){
				console.error(err);
				return vscode.window.showErrorMessage("Failed to genrate folder structure");
			}
		}

		let createEntityFiles = () => {
			let entityFile = path.join(entityFolderPath, `${name}.js`);
			let entityIndexFile = path.join(entityFolderPath, `index.js`);

			let entityContent = `export default function buildMake${upperCaseName} ({}) {
	return function make${upperCaseName}({} = {}){
		
	}
}`;
			let entityIndexContent = `const make${upperCaseName} = buildMake${upperCaseName}({});

export default make${upperCaseName};`;

			fs.writeFile(entityFile, entityContent, errorHandler);
			fs.writeFile(entityIndexFile, entityIndexContent, errorHandler);
		}

		let createUseCasesFiles = () => {
			let useCasesIndexFile = path.join(useCasesFolderPath, `index.js`);

			let useCasesContent = `const ${name}Service = Object.freeze({});

export default ${name}Service;`;

			fs.writeFile(useCasesIndexFile, useCasesContent, errorHandler);
		}

		let createControllerFiles = () => {
			let controllerIndexFile = path.join(controllerFolderPath, `index.js`);

			let controllerIndexContent = `import {} from "../use_cases/${name}"

const ${name}Controller = Object.freeze({});

export default ${name}Controller;`;

			fs.writeFile(controllerIndexFile, controllerIndexContent, errorHandler);
		}

		if(!fs.existsSync(useCasesFolderPath)){
			fs.mkdir(useCasesFolderPath, {recursive : true}, createUseCasesFiles);
		}

		if(!fs.existsSync(entityFolderPath)){
			fs.mkdir(entityFolderPath, {recursive : true}, createEntityFiles);
		}
		
		if(!fs.existsSync(controllerFolderPath)){
			fs.mkdir(controllerFolderPath, {recursive : true}, createControllerFiles);
		}

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
