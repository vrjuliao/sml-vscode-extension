const spawn = require('child_process').spawn;
const vscode = require('vscode');

let sml;
const smlOutput = vscode.window.createOutputChannel("SML");
let allowNextCommand;

function start() {
	allowNextCommand = false;
	const interpreter = vscode.workspace.getConfiguration().get("sml-environment-interpreter-path", "sml")

	var cwd = {};
	if (vscode.workspace.workspaceFolders !== undefined) {
		var wd = vscode.workspace.workspaceFolders[0].uri.path;

		//may start with / for some reason
		if(wd[0] === '/')
			wd = wd.substr(1, cwd.length);

		console.log("setting path to: " + wd)

		cwd = {cwd: wd};
	}
	else {
		console.log("Unable to set working directory, no current workspace folder")
	}

	sml = spawn(interpreter, [], Object.assign({ shell: true }, cwd));

	sml.stdin.setEncoding('utf-8');
	sml.stdout.setEncoding('utf-8');
	sml.stderr.setEncoding('utf-8');
	console.log('started');
	sml.stdin.read(0);

	sml.on('error', function (err) {
		console.log(err);
		smlOutput.append(err.message)
	})

	sml.stderr.on('data', (data) => {
		smlOutput.show(false);
		smlOutput.append(data + `\n`);
		allowNextCommand = true;
	});

	sml.stdout.on('data', (data) => {
		smlOutput.show(false);
		smlOutput.append(data + `\n`);
	});
	smlOutput.show(false);
}

async function execShortCode() {
	while (!sml && !allowNextCommand) { ; }
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		const selection = editor.selection;

		const code = document.getText(selection);
		if (sml.exitCode === 0 || sml.exitCode)
			vscode.window.showErrorMessage("SML process died")
		else {
			try {
				allowNextCommand = false;
				sml.stdin.write(code + ';');
			} catch (error) {
				smlOutput.append(error.message)
			}
		}
	}
}

function restartREPL() {
	//stop interpreter
	sml.stdin.write("\0x26");
	//stop cmdline
	sml.stdin.end();	
	//start again
	start();
}

function stop() {
	sml.stdin.end();
}

module.exports = {
	start,
	stop,
	execShortCode,
	restartREPL
}