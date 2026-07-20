pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Vishwa-ops/crud-api.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Generate Prisma Client') {
            steps {
                sh 'npx prisma generate'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                cp -r . /home/ubuntu/crud-api/
                cd /home/ubuntu/crud-api
                npm install
                npx prisma generate
                pm2 restart crud-api || pm2 start server.js --name crud-api
                '''
            }
        }
    }

    post {
        success {
            echo 'CRUD API deployed successfully!'
        }

        failure {
            echo 'Deployment failed!'
        }
    }
}
