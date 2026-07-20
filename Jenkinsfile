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
                rm -rf $BACKUP_DIR
                cp -r $APP_DIR $BACKUP_DIR
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                rsync -av \
                --delete \
                --exclude=node_modules \
                --exclude=.git \
                --exclude=.env \
                ./ $APP_DIR/

                cd $APP_DIR

                npm install

                npx prisma generate

                pm2 restart crud-api --update-env

                pm2 save
                '''
            }
        }
    }

    post {

        success {
            echo "Deployment Successful"
        }

        failure {
            echo "Deployment Failed"
            echo "Rolling Back..."

            sh '''
            rm -rf $APP_DIR

            cp -r $BACKUP_DIR $APP_DIR

            cd $APP_DIR

            npm install

            pm2 restart crud-api --update-env

            pm2 save
            '''

            echo "Rollback Completed"
        }
    }
}
