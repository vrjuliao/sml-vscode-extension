const spawn = require('child_process').spawn;
const vscode = require('vscode');

let sml;
let smlOutput;

function start(){
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
	});

	sml.stdout.on('data', (data) => {
		smlOutput.show(false);
		smlOutput.append(data + `\n`);
	});
	smlOutput = vscode.window.createOutputChannel("SML");
	smlOutput.show(false);
}

function execShortCode(){
	if(!sml){
		start();
		setTimeout(()=>{execShortCode()}, 100);
	} 
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