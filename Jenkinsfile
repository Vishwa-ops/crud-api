pipeline {
    agent any

    environment {
        APP_DIR = "/home/ubuntu/crud-api"
        BACKUP_DIR = "/home/ubuntu/crud-api-backup"
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

        stage('Backup Current Version') {
            steps {
                sh '''
                echo "Creating Backup..."

                rm -rf $BACKUP_DIR
                mkdir -p $BACKUP_DIR

                rsync -av \
                    --exclude=node_modules \
                    --exclude=.git \
                    --exclude=.env \
                    $APP_DIR/ $BACKUP_DIR/

                echo "Backup Completed"
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                echo "Deploying Application..."

                rsync -av \
                    --delete \
                    --exclude=node_modules \
                    --exclude=.git \
                    --exclude=.env \
                    ./ $APP_DIR/

                cd $APP_DIR

                npm install

                npx prisma generate

                pm2 restart crud-api --update-env || pm2 start server.js --name crud-api

                pm2 save

                echo "Deployment Completed"
                '''
            }
        }
    }

    post {

        success {
            echo "===================================="
            echo "Deployment Successful"
            echo "===================================="
        }

        failure {

            echo "===================================="
            echo "Deployment Failed"
            echo "Starting Rollback..."
            echo "===================================="

            sh '''
            if [ -d "$BACKUP_DIR" ]; then

                rm -rf $APP_DIR

                mkdir -p $APP_DIR

                rsync -av \
                    --exclude=node_modules \
                    $BACKUP_DIR/ $APP_DIR/

                cd $APP_DIR

                npm install

                npx prisma generate

                pm2 restart crud-api --update-env || pm2 start server.js --name crud-api

                pm2 save

                echo "Rollback Successful"

            else

                echo "No Backup Found"

            fi
            '''
        }

        always {
            cleanWs()
        }
    }
}
