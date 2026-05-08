which jenkins file to do this webapp or tests:

Update Jenkins pipeline logic

Your Jenkinsfile MUST:

1. Pull web app repo
git clone Disaster-Management-App
2. Build Docker image
docker build -t app .
3. Start container (IMPORTANT)
docker-compose up -d

OR:

docker run -d -p 3000:3000 app
4. Pull test repo inside pipeline
git clone disaster-management-tests
5. Run Selenium tests (containerized)

Either:

Maven + Chrome image
OR
your custom Docker image

Example:

docker run --network host test-image


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
                sh 'docker compose -f docker-compose.jenkins.yml down || true'
            }
        }

        stage('Build & Run CI Containers') {
            steps {
                sh 'docker compose -f docker-compose.jenkins.yml up -d --build'
            }
        }

        stage('Verify') {
            steps {
                sh 'docker ps'
            }
        }
    }
}





pipeline {
    agent any

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t disaster-tests .'
            }
        }

        stage('Run Tests in Docker') {
            steps {
                sh 'docker run --rm disaster-tests'
            }
        }
    }

    post {
        always {
            script {

                // safer fallback approach for email
                def email = "qasim.malik@gmail.com"

                try {
                    email = sh(
                        script: "git log -1 --pretty=format:%ae",
                        returnStdout: true
                    ).trim()
                } catch (Exception e) {
                    echo "Could not extract git email, using fallback"
                }

                echo "Sending email to: ${email}"

                emailext (
                    to: email,
                    subject: "Jenkins CI Results - Disaster Tests #${env.BUILD_NUMBER}",
                    body: """
Hello,

Pipeline has completed.

Project: Disaster Management Tests
Build Number: ${env.BUILD_NUMBER}
Build Status: ${currentBuild.currentResult}

View details: ${env.BUILD_URL}

Regards,
Jenkins CI Pipeline
""",
                    attachLog: true,
                    mimeType: 'text/plain'
                )
            }

            echo "Pipeline finished"
        }
    }
}
