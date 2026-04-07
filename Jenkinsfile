pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/OmerBinDawood/Disaster-Management-App'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker-compose -f docker-compose.jenkins.yml down || true'
            }
        }

        stage('Build & Run CI Containers') {
            steps {
                sh 'docker-compose -f docker-compose.jenkins.yml up -d --build'
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps'
            }
        }
    }
}
