---
sidebar_label: "8.1 Software Preparation"
sidebar_position: 1
---

# 8.1 Software Preparation

:::danger

This page is currently under maintenance reworked and contains outdated content.

:::

<!--TODO: add tip box with link to monitoring theory section-->

<!--explain order in what the monitoring will be set up-->

<!--link docker monitoring package from lukso and state that the following setup is for lukso cli or custom setups. docker will come with their own monitoring tools-->

### 1. Installing Core Tools

Effective node monitoring is essential for maintaining a reliable and secure node and fostering trust within the blockchain ecosystem. Let's follow up by explaining the different tools and installing some core packages needed to download and execute such software.

- **wget**: Utility tool for non-interactive download of files from the Web. It supports HTTP, HTTPS, and FTP protocols and retrieval through HTTP proxies. It's beneficial for downloading files from the command line, automating downloads, or when a graphical user interface is unavailable, like on our server installation.
- **make**: Automation tool for software builds, generating executable programs and libraries from source code by reading files called Makefiles, which specify how to derive the target program. It's widely used in software development for compiling and linking source code files.
- **git**: Distributed version control system for tracking changes in source code during software development, allowing developers to collaborate, clone, and manage software projects effectively. It will help us download code repositories.
- **apt-transport-https**: Software service allowing the package management utility to retrieve files over the HTTPS protocol. Once installed, APT can retrieve packages more securely.
- **software-properties-common**: A software package that provides some useful tools for adding and managing software repositories. The most common tool it offers is the `add-apt-repository` command to add software packages to the node.
- **gnupg2**: OpenPGP standard for encrypting and signing data and communication. It is used to receive and install signed software packages.

Install the following six tools that we will need to set up Prometheus, Grafana, and all the Exporters:

```sh
sudo apt install wget make git apt-transport-https software-properties-common gnupg2
```
