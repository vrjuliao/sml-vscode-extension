# SML Environment
SML Environment is an extension for
[Visual Studio Code](https://code.visualstudio.com/), allowing short executions
like [EMACS sml-mode](https://www.smlnj.org/doc/Emacs/sml-mode.html) and
providing a text-highlight with some auto-complete features.

This project is been developed by **Vinícius Julião**
([`@vrjuliao`](https://github.com/vrjuliao)), but the text-highlight is an 
updated version of
[Standard ML](https://marketplace.visualstudio.com/items?itemName=freebroccolo.sml) extension
by **Darin Morrison** ([`@freebroccolo`](https://github.com/freebroccolo/))

## Features
- Short Execution:
    1. Open a sml file (or change your Language Mode for `sml` by `Ctrl+K M`)
    2. Select a piece of SML code.
    3. Press `Ctrl+Enter` (Linux, Windows) or `Cmd+Enter` (Mac).
    4. See the result on Output console.

    <img src="https://github.com/vrjuliao/sml-vscode-extension/raw/master/demo-media/execution-example.gif" alt="demo of preview feature" height="440px">

- Text Highlight:
  
  <img src="https://github.com/vrjuliao/sml-vscode-extension/raw/master/demo-media/highlight.png" alt="demo of preview feature" height="160px">

- `use` statement:\
  To import a file to the environment, specify the filepath considering the
  workspace root directory as the starting point.
  For instance, if you have opened the folder `my_codes/workdir/`, and want to
  import `my_codes/workdir/foo.sml`, then type:
  ```sml
  use "foo.sml"
  ```

- Run current File:\
  **This option will restart the REPL environment**
  1. Press `Ctrl+Shift+P` (Linux, Windows) or `Cmd+Shift+P` (Mac) open Command Palette.
  2. Type `sml`.
  3. Select "SML Environment: Execute current file".

## Requirements

- ### SML/NJ

  This extension needs of [SML/NJ](https://www.smlnj.org/) for short execution.
  After install that, add the `sml` bin directory in your `$PATH`

  - Windows\
    Download msi file
    [here](http://smlnj.cs.uchicago.edu/dist/working/110.98.1/smlnj-110.98.1.msi)
  
  - Linux\
    **WARNING**: `smlnj` not work well in **WSL**.
    To use this extension on Windows, it is preferable install it directly in
    Windows.\
    Search for `smlnj` in your package manager.
    For instance, on Ubuntu terminal, type:
    ```bash
    foo@bar:~$ sudo apt install smlnj
    ```
  
  - MacOs\
    Via Brew:
    ```bash
    foo@bar:~$ brew install --cask smlnj
    ```
  - Or else\
    Follow the steps in
    [SML/NJ download page](https://www.smlnj.org/dist/working/110.98.1/index.html)
    for you operating system.

## Configuration

Instead of add the sml interpreter to the `$PATH`, you can specify a binary for
the sml interpreter.
Just setting the `sml-environment-interpreter-path` attribute on your
`settings.json` file.

## Release Notes

### 0.0.2
- `use` statement:\
  Adding the capability for import files.

- Bug fixed: Now, all syntax errors will be reported instantly.
  
- Syntax highlight fixes.

### 0.0.1
Initial release

-----------------------------------------------------------------------------------------------------------

## GitHub

The code for this extension is available on github at: https://github.com/vrjuliao/sml-vscode-extension

## Like this work?

- :smile: Star this project on GitHub and Visual Studio Marketplace
- :blush: Leave a comment

## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
