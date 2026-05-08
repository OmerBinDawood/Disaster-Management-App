pipeline {
    agent any

    environment {
        APP_IMAGE = "disaster-app"
        TEST_IMAGE = "disaster-tests"
        DEFAULT_EMAIL = "recipient@domain.com"
    }

    stages {

        stage('Checkout Web App') {
            steps {
                git branch: 'main',
                url: 'https://github.com/OmerBinDawood/Disaster-Management-App'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build App Image') {
            steps {
                sh 'docker build -t $APP_IMAGE .'
            }
        }

        stage('Start App Container') {
            steps {
                sh 'docker run -d -p 3000:3000 --name app_container $APP_IMAGE'
            }
        }

        stage('Clone Test Repo') {
            steps {
                sh 'rm -rf tests || true'
                sh 'git clone https://github.com/OmerBinDawood/disaster-management-tests tests'
            }
        }

        stage('Build Test Image') {
            steps {
                sh 'cd tests && docker build -t $TEST_IMAGE .'
            }
        }

        stage('Run Selenium Tests') {
            steps {
                sh "docker run --rm --network host $TEST_IMAGE"
            }
        }
    }

    post {
        always {
            script {

                // cleanup container
                sh 'docker stop app_container || true'
                sh 'docker rm app_container || true'

                // ----------------------------
                // FIX: dynamic email handling
                // ----------------------------

                def commitEmail = sh(
                    script: "git log -1 --pretty=format:%ae || echo ''",
                    returnStdout: true
                ).trim()

                def authorEmail = commitEmail ? commitEmail : env.DEFAULT_EMAIL

                emailext(
                    to: authorEmail,
                    subject: "CI/CD Pipeline Build #${env.BUILD_NUMBER} - ${currentBuild.currentResult}",
                    body: """
========================================
DISASTER MANAGEMENT PIPELINE RESULT
========================================

Build Number : ${env.BUILD_NUMBER}
Status       : ${currentBuild.currentResult}
Job URL      : ${env.BUILD_URL}

Repo         : Disaster Management App
Branch       : main

========================================
""",
                    attachLog: true
                )
            }
        }
    }
}
