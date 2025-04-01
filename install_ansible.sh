#!/bin/bash

# Detect OS
if [[ -f /etc/os-release ]]; then
    . /etc/os-release
    OS=$ID
else
    echo "Cannot detect OS. Exiting."
    exit 1
fi

# Install Ansible based on OS
echo "Detected OS: $OS"

if [[ "$OS" == "ubuntu" || "$OS" == "debian" ]]; then
    echo "Installing Ansible using apt..."
    sudo apt update -y
    sudo apt install -y ansible
elif [[ "$OS" == "centos" || "$OS" == "rhel" || "$OS" == "fedora" ]]; then
    echo "Installing Ansible using yum..."
    sudo yum install -y epel-release
    sudo yum install -y ansible
else
    echo "Unsupported OS. Please install Ansible manually."
    exit 1
fi

# Verify Installation
ansible --version
