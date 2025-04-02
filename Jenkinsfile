pipeline {
    agent { label 'Ansible-master' }  // This defines the agent where the pipeline will run

    environment {
        ANSIBLE_INVENTORY = '~/Project-6/hosts.ini'  // Define the path to your Ansible inventory file
        ANSIBLE_PLAYBOOK_DIR = '~/Project-6/playbooks' // Define the directory where the Ansible playbooks are located
    }

    stages {
        stage('Checkout Git Repository') {
            steps {
                script {
                    // Perform the Git checkout of the troubleshoot branch
                    git branch: 'troubleshoot', url: 'https://github.com/DynamicTimzy/Project-6.git'
                }
            }
        }

        stage('Run Ansible Playbook') {
            steps {
                script {
                  // Run the Ansible playbook after the checkout
                  sh """
                  cd Project-6
                  sudo ./install_ansible.sh
                  ansible-playbook 01-* -i hosts.ini && sleep 5 && \
                  ansible-playbook 02-* -i hosts.ini && sleep 5 && \
                  ansible-playbook 03-* -i hosts.ini && sleep 5 && \
                  ansible-playbook 04-* -i hosts.ini && sleep 5 && \
                  ansible-playbook 05-* -i hosts.ini
                  """
                  # ansible-playbook ${ANSIBLE_PLAYBOOK_DIR}/playbook.yml -i ${ANSIBLE_INVENTORY} --ask-become-pass
                }
            }
        }
    }

    post {
        success {
            echo 'Playbook executed successfully.'
        }
        failure {
            echo 'Playbook execution failed.'
        }
    }
}
