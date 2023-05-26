def buildJar() {
    echo "building the application..."
    sh 'pwd'
} 

def buildImage() {
    echo "building the docker image..."
    withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
        sh 'docker build -t djangoreactdev/codehelp:1.0 ./front-next'
        sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
        sh 'docker push djangoreactdev/codehelp:1.0'
    }
} 

def deployApp() {
    echo 'deploying the application...'
    sh 'docker pull djangoreactdev/codehelp:1.0'
    sh 'docker stop codehelp || true'
    sh 'docker rm codehelp || true'
    sh 'docker rmi codehelp || true'
    sh 'docker pull djangoreactdev/codehelp:1.0'
    sh 'docker run -d --name codehelp -p 80:3000 djangoreactdev/codehelp:1.0'
} 

return this
