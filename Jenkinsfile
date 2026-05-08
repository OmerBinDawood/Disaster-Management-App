pipeline {
    agent any

    environment {
        APP_IMAGE = "disaster-app"
        TEST_IMAGE = "disaster-tests"
        APP_CONTAINER = "app_container"
    }

    stages {

        stage('Checkout Web App') {
            steps {
                git branch: 'main',
                url: 'https://github.com/OmerBinDawood/Disaster-Management-App'
            }
        }

        stage('Cleanup Old Containers') {
            steps {
                sh '''
                    docker stop $APP_CONTAINER || true
                    docker rm $APP_CONTAINER || true
                    docker compose down || true
                '''
            }
        }

        stage('Build App Image') {
            steps {
                sh 'docker build -t $APP_IMAGE .'
            }
        }

        stage('Run App Container') {
            steps {
                sh '''
                    docker run -d \
                    -p 3000:3000 \
                    --name $APP_CONTAINER \
                    $APP_IMAGE
                '''
            }
        }

        stage('Clone Test Repo') {
            steps {
                sh '''
                    rm -rf tests || true
                    git clone https://github.com/OmerBinDawood/disaster-management-tests tests
                '''
            }
        }

        stage('Build Test Image') {
            steps {
                sh 'docker build -t $TEST_IMAGE ./tests'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh '''
                    docker run --rm \
                    --network host \
                    $TEST_IMAGE
                '''
            }
        }
    }

    post {

        always {
            script {
                sh '''
                    docker stop $APP_CONTAINER || true
                    docker rm $APP_CONTAINER || true
                '''
            }

            emailext(
                to: 'recipient@domain.com',
                subject: "CI/CD Pipeline Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                mimeType: 'text/plain',
                body: """\
========================================
DISASTER MANAGEMENT PIPELINE RESULT
========================================

Build Number : ${env.BUILD_NUMBER}
Status       : ${currentBuild.currentResult}
Job URL      : ${env.BUILD_URL}

App Image    : ${APP_IMAGE}
Test Image   : ${TEST_IMAGE}

========================================
""",
                attachLog: true,
                compressLog: true,
                replyTo: 'noreply@jenkins-ci.local'
            )
        }
    }
}
