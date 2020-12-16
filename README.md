# SML Environment
SML Environment is an extension for
[Visual Studio Code](https://code.visualstudio.com/), allowing short executions
like [EMACS sml-mode](https://www.smlnj.org/doc/Emacs/sml-mode.html) and
providing a text-highlight with some auto-complete features.

This project is been developed by Vinícius Julião
([`@vrjuliao`](https://github.com/vrjuliao)), but the text-highlight is an 
updated version of
[Standard ML](https://marketplace.visualstudio.com/items?itemName=freebroccolo.sml) extension
by **Darin Morrison** ([`@freebroccolo`](https://github.com/freebroccolo/))

## Features
- Short Execution:
    1. Select a piece of SML code.
    2. Press `Ctrl+Shift+Enter`.
    3. See the result on Output console.

    <img src="https://github.com/vrjuliao/sml-vscode-extension/raw/master/demo-media/execution-example.gif" alt="demo of preview feature" height="440px">

- Text Highlight:
  
  <img src="https://github.com/vrjuliao/sml-vscode-extension/raw/master/demo-media/highlight.png" alt="demo of preview feature" height="160px">

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
    Windows.

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
  - Or else
    Follow the steps in
    [SML/NJ download page](https://www.smlnj.org/dist/working/110.98.1/index.html)
    for you operating system.

If you have any requirements or dependencies, add a section describing those and how to install and configure them.


## Known Issues

- Import files\
  Currently `use "<import_file>.sml"` is not working.

## Release Notes

### 0.1
Initial release

-----------------------------------------------------------------------------------------------------------

## GitHub

The code for this extension is available on github at: https://github.com/vrjuliao/sml-vscode-extension

## Like this work?

- :smile: Star this project on GitHub and Visual Studio Marketplace
- :blush: Leave a comment

## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
