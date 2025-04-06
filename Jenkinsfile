pipeline {
  agent {
    label 'ansible-master'
  } // This defines the agent where the pipeline will run
  environment {
    BUILD_STATUS='SUCCESS' // Default status set at the start
  }
  stages {
    stage('Checkout Git Repository') {
      steps {
        script {
          // Perform the Git checkout of the main branch
          git branch: 'main', url: 'https://github.com/DynamicTimzy/Project-6.git'
        }
      }
    }

    stage('Run Ansible Playbook') {
      steps {
        script {
          // Run the Ansible playbook after the checkout
          sh """
          sudo chmod +x install_ansible.sh
          sudo ./install_ansible.sh
          ansible-playbook 01-* -i hosts.ini && sleep 5 && \
          ansible-playbook 02-* -i hosts.ini && sleep 5 && \
          ansible-playbook 03-* -i hosts.ini && sleep 5 && \
          ansible-playbook 04-* -i hosts.ini && sleep 5 && \
          ansible-playbook 05-* -i hosts.ini 
          """
        }
      }
    }
  }
  post {
    always {
      script {
        // Update BUILD_STATUS dynamically
        currentBuild.result = currentBuild.result ?: 'SUCCESS' // Default to SUCCESS if not set
        env.BUILD_STATUS = currentBuild.result // Make BUILD_STATUS globally available
      }

      emailext(
        body: """
          <h3>Build Notification</h3>
          <p>Build <strong>${BUILD_NUMBER}</strong> of <strong>${JOB_NAME}</strong> finished with status: <strong>${env.BUILD_STATUS}</strong></p>
          <p>Check console output at <a href="${BUILD_URL}">this link</a> to view the results.</p>
        """,
        subject: "Build # ${BUILD_NUMBER} - ${JOB_NAME} - ${env.BUILD_STATUS}",
        to: 'yimikacreations@gmail.com'
      )
    }
  }
}
