const spawn = require("child_process").spawn;
const vscode = require("vscode");

let sml;
const smlOutput = vscode.window.createOutputChannel("SML");
let allowNextCommand;

function start() {
	allowNextCommand = false;
	const interpreter = vscode.workspace
	.getConfiguration()
	.get("sml-environment-interpreter-path", "sml");

	var cwd = {};
	if (vscode.workspace.workspaceFolders !== undefined) {
		var wd = vscode.workspace.workspaceFolders[0].uri.fsPath;
		console.log("setting path to: " + wd);
		cwd = { cwd: wd };
	} else {
		console.log("Unable to set working directory, no current workspace folder");
	}
	
	sml = spawn(interpreter, [], Object.assign({ shell: true }, cwd));
	
	sml.stdin.setEncoding("utf-8");
	sml.stdout.setEncoding("utf-8");
	sml.stderr.setEncoding("utf-8");
	console.log("started");
	sml.stdin.read(0);

	sml.on("error", function (err) {
		console.log(err);
		smlOutput.append(err.message);
	});

	sml.stderr.on("data", (data) => {
		smlOutput.show(false);
		smlOutput.append(data + `\n`);
		allowNextCommand = true;
	});

	sml.stdout.on("data", (data) => {
		smlOutput.show(false);
		smlOutput.append(data + `\n`);
	});
	smlOutput.show(false);
}

async function execCode(code) {
	while (!sml && !allowNextCommand) { ; }

	if (sml.exitCode === 0 || sml.exitCode)
		vscode.window.showErrorMessage("SML process died");
	else {
		try {
			allowNextCommand = false;
			sml.stdin.write(code + ";;;;\r\n");
		} catch (error) {
			smlOutput.append(error.message);
		}
	}
  await vscode.commands.executeCommand(
		"workbench.action.terminal.scrollToBottom"
	);
}


async function execShortCode() {
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		const selection = editor.selection;
		const code = document.getText(selection);
		execCode(code);
	}
}

async function execCurrentFile() {
	restart()

	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document
		const code = document.getText()
		execCode(code);
  }
}

function restart() {
	if (sml.exitCode !== 0 && !sml.exitCode) {
		sml.stdin.end();
	}
	sml.kill();
	start();
}
	
function stop() {
	sml.stdin.end();
}

module.exports = {
	start,
	stop,
	restart,
	execShortCode,
	execCurrentFile
};
