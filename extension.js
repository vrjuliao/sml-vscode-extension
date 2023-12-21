// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const child_process = require('child_process');
const smlEnviron = require('./smlEnvironmentManager');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

// Path to the "smlformat" executable
const smlFormatCmd = 'smlformat'; // Assuming "smlformat" is available in the system PATH

/**
 * Format SML code using the "SMLFormat" tool.
 * @param {string} smlCode The SML code to format.
 * @returns {string} The formatted SML code.
 */
function formatSMLCode(smlCode) {
    const lines = smlCode.split('\n');
    let indentLevel = 0;
    const formattedLines = lines.map(line => {
        // Trim leading and trailing whitespace
        line = line.trim();

        // Decrease indent for end of blocks
        if (/^end/.test(line) || /^else/.test(line)) {
            indentLevel = Math.max(indentLevel - 1, 0);
        }

        // Create indent
        const currentIndent = '    '.repeat(indentLevel);
        const formattedLine = currentIndent + line;

        // Increase indent for start of blocks
        if (/(if|else if|fun|let)\b/.test(line) && !line.endsWith('then') && !line.endsWith('in')) {
            indentLevel++;
        }

        return formattedLine;
    });

    return formattedLines.join('\n');
}

function fullDocumentRange(document) {
    return new vscode.Range(
        document.positionAt(0),
        document.positionAt(document.getText().length)
    );
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	// start sml exection
	smlEnviron.start();
	console.log('Congratulations, your extension "sml-environment" is now active!');
	
	let execShortCode = vscode.commands.registerCommand('sml-environment.execShortCode', () => smlEnviron.execShortCode());
	let restartRepl = vscode.commands.registerCommand('sml-environment.restart', () => smlEnviron.restart());
	let execCurrentFile = vscode.commands.registerCommand('sml-environment.execCurrentFile', () => smlEnviron.execCurrentFile())
	let disposable = vscode.commands.registerCommand('sml-environment.format', () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const formattedCode = formatSMLCode(document.getText()); // Replace with your formatting logic
            editor.edit(editBuilder => {
                editBuilder.replace(new vscode.Range(0, 0, document.lineCount, 0), formattedCode);
            });
        }
    });
	context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(
        'sml', // Language ID
        {
            provideDocumentFormattingEdits(document, options, token) {
                // Implement your SML formatting logic here
                // Return the formatted text as a TextEdit array
                const formattedText = formatSMLCode(document.getText());
                return [vscode.TextEdit.replace(fullDocumentRange(document), formattedText)];
            }
        }
    ));
    context.subscriptions.push(disposable);
	context.subscriptions.push(execShortCode);
	context.subscriptions.push(restartRepl);	
	context.subscriptions.push(execCurrentFile)
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
