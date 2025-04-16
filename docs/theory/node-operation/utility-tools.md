---
sidebar_label: "Utility Tools"
sidebar_position: 3
---

# Utility Tools

### System Control

System Control is a powerful command-line utility that is the primary management tool for system processes, widely used across modern Linux distributions. By leveraging `systemctl`, administrators can control and get insights into their system's state, enabling them to fine-tune their environment for optimal performance, stability, and security. The system control command offers a unified and consistent approach to starting, stopping, enabling, disabling, and checking the status of various components.

#### Text Editors

We can use various terminal text editors to configure files on the node. Ubuntus's default text editor is called Vi Improved. I will use the default editor `vim` in this guide. However, you can also choose a more user-friendly one like `nano`. Here is a description of the two:

#### Vim

Vim is an enhanced version of the classic Unix text editor Vi, with additional features and improved usability. Vim operates in multiple modes: normal mode, insert mode, and command mode, allowing users to navigate, edit, and manipulate text files efficiently.

You'll start in normal mode once the file is open in Vim. You navigate through files by using the arrow keys.

To enter insert mode to edit the text, press `i`. You'll see `-- INSERT --` at the bottom of the screen- press `Esc` to exit insert mode and return to normal mode.

To enter command mode to manage to save and exit, press `:` while in normal mode. A colon will appear at the bottom of the screen.

- To write and quit, type `wq` and press `Enter`.
- To quit without saving: type `q!` and press `Enter`.

#### Nano

Nano is a beginner-friendly text editor on Ubuntu. Nano is a simple, modeless, command-line text editor in most Linux distributions. It is designed to be easy to use and suitable for editing system configuration files, writing programming scripts, and other text editing tasks.

Once you've opened a file in Nano, you can edit it immediately. Navigation through the file is accomplished using the arrow keys.

Unlike Vim, Nano doesn't have different modes like normal or insert mode. You're in editing mode as soon as the file opens and can start changing the text.

At the bottom of the Nano screen, you'll see a row of commands, each represented by a caret symbol (`^`) and a letter. The caret symbol represents the `Ctrl` key.

- To save changes, press `Ctrl + O`, and press `Enter`.
- To exit, press `Ctrl + X`. If you've made changes, you will be asked to save them- press `Y` for Yes or `N` for No.
