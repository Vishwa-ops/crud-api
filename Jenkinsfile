pipeline {
    agent any

    environment {
        APP_DIR = "/home/ubuntu/crud-api"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vishwa-ops/crud-api.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'cd $APP_DIR && npm install'
            }
        }

        stage('Generate Prisma Client') {
            steps {
                sh 'cd $APP_DIR && npx prisma generate'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                pm2 restart crud-api || pm2 start server.js --name crud-api
                '''
            }
        }
    }

    post {
        success {
            echo 'CRUD API deployed successfully.'
        }

        failure {
            echo 'Deployment failed.'
        }
    }
}
