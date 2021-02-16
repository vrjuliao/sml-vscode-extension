const spawn = require('child_process').spawn;
const vscode = require('vscode');

let sml;
const smlOutput = vscode.window.createOutputChannel("SML");
let allowNextCommand;

function start(){
	allowNextCommand = false;
	const interpreter = vscode.workspace.getConfiguration().get("sml-environment-interpreter-path","sml")
	sml = spawn(interpreter, [], {shell: true});
	
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

async function execShortCode(){
	while(!sml && !allowNextCommand){;}
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		const selection = editor.selection;

		const code = document.getText(selection);
		if(sml.exitCode===0 || sml.exitCode) 
			vscode.window.showErrorMessage("SML process died")
		else {
			try {
				allowNextCommand = false;
				sml.stdin.write(code+';');			
			} catch (error) {
				smlOutput.append(error.message)			
			}
		}
	}
}

function stop(){
	sml.stdin.end();
}

module.exports = {
	start,
	stop,
	execShortCode
}