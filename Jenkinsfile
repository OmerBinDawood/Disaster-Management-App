pipeline {
    agent any

    stages {

        stage('Clone Repo') {
            steps {
                git branch: 'main',
                url: 'https://github.com/YOUR_USERNAME/YOUR_REPO.git'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose -f docker-compose.jenkins.yml down || true'
            }
        }

        stage('Build & Run Containers') {
            steps {
                sh 'docker compose -f docker-compose.jenkins.yml up -d --build'
            }
        }

    }

    post {
        always {
            echo "CI/CD pipeline executed successfully"
        }
    }
}
