// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const smlEnviron = require('./smlEnvironmentManager');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// start sml exection
	smlEnviron.start();
	console.log('Congratulations, your extension "sml-environment" is now active!');
	
	let execShortText = vscode.commands.registerCommand('sml-environment.executeSelected', () => smlEnviron.execShortCode());
	
	context.subscriptions.push(execShortText);	
}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
	smlEnviron.stop();
}

module.exports = {
	activate,
	deactivate
}
