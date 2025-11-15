pipeline {
    agent any

    environment {
        DOCKERHUB = credentials('dockerhub_credentials')
    }

    stages {
        
        stage('Clone Code') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/Darshana752/ResturentmanagementProject.git'
            }
        }

        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh './mvnw clean package -DskipTests'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker build -t yourname/backend:latest ./backend"
                sh "docker build -t yourname/frontend:latest ./frontend"
            }
        }

        stage('Push to DockerHub') {
            steps {
                sh "echo $DOCKERHUB_USR | docker login -u $DOCKERHUB_USR -p $DOCKERHUB_PSW"
                sh "docker push yourname/backend:latest"
                sh "docker push yourname/frontend:latest"
            }
        }

        stage('Deploy to Server') {
            steps {
                sh "docker-compose pull"
                sh "docker-compose down"
                sh "docker-compose up -d"
            }
        }
    }
}
