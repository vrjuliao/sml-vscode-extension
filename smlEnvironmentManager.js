const spawn = require('child_process').spawn;
const vscode = require('vscode');

let sml;
let smlOutput;
let allowNextCommand;

function start(){
	let allowNextCommand = false;
	sml = spawn('sml', [], {shell: true});
	
	sml.stdin.setEncoding('utf-8');
	sml.stdout.setEncoding('utf-8');
	sml.stderr.setEncoding('utf-8');
	console.log('started');
	sml.stdin.read(0);
	
	sml.on('error', function (err) {
		console.log(err);
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
	smlOutput = vscode.window.createOutputChannel("SML");
	smlOutput.show(false);
}

async function execShortCode(){
	while(!sml && !allowNextCommand){;}
	const editor = vscode.window.activeTextEditor;

	if (editor) {
		const document = editor.document;
		const selection = editor.selection;

		const code = document.getText(selection);
		sml.stdin.write(code+';');
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