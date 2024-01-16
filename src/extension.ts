import * as vscode from 'vscode';
// Import the child_process module. This allows us to run shell commands from within our extension.
import * as cp from 'child_process';

// This method is called when your extension is activated.
// Your extension is activated the very first time the command is executed.
export function activate(context: vscode.ExtensionContext) {

    // This line of code will only be executed once when your extension is activated.
    console.log('Congratulations, your extension "pandoc-yaml" is now active!');

    // The command has been defined in the package.json file.
    // Now we provide the implementation of the command with registerCommand.
    // The commandId parameter must match the command field in package.json.
    let disposable = vscode.commands.registerCommand('pandoc-yaml.pandoc-yaml', () => {
        // Get the active text editor.
        let activeEditor = vscode.window.activeTextEditor;
        if (activeEditor) {
            // Get the file path of the active text editor.
            let filePath = activeEditor.document.uri.fsPath;
            // Execute the shell command `echo ${filePath}`.
            // This will print the file path of the active text editor.
            cp.exec(`eval "$(echo "$(sed -n '/---/,/---/p' "${filePath}" | sed '/---/d')" | yq '.run-command' -)"`, (err, stdout, stderr) => {
                // If there's an error executing the command, show an error message.
                if (err) {
                    vscode.window.showErrorMessage(`Error: ${err.message}`);
                }
                // If the command outputs to stderr, show an error message.
                else if (stderr) {
                    vscode.window.showErrorMessage(`Error: ${stderr}`);
                }
                // If the command outputs to stdout, show an information message with the output.
                else {
                    vscode.window.showInformationMessage(stdout);
                    vscode.window.showInformationMessage(`File successfully converted!`);
                }
            });
        }
    });

    // Add the command to the extension's subscriptions so it is disposed when the extension is deactivated.
    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated.
export function deactivate() {}
