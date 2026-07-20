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
                mkdir -p $APP_DIR

                rsync -av \
                    --delete \
                    --exclude=node_modules \
                    --exclude=.git \
                    --exclude=.env \
                    ./ $APP_DIR/

                cd $APP_DIR

                npm install

                npx prisma generate

                pm2 restart crud-api || pm2 start server.js --name crud-api

                pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo '========================================='
            echo 'CRUD API deployed successfully!'
            echo '========================================='
        }

        failure {
            echo '========================================='
            echo 'Deployment failed!'
            echo '========================================='
        }
    }
}
