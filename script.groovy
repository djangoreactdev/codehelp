def buildJar() {
    echo "building the application..."
    sh 'pwd'
} 

def buildImage() {
    echo "building the docker image..."
    // sh 'docker build -t djangoreactdev/codehelp:1.0 ./front-next'
    // sh 'docker build -t djangoreactdev/codehelp-api:1.0.2 ./compose/local/django'

    withCredentials([
            file(credentialsId: 'env_file_codehelp_django', variable: 'ENV_codehelp_django'),
            file(credentialsId: 'env_file_codehelp_postgres', variable: 'ENV_codehelp_postgres')
        ]) {
            writeFile file: '.envs/.production/.django', text: readFile(ENV_codehelp_django)
            writeFile file: '.envs/.production/.postgres', text: readFile(ENV_codehelp_postgres)
        }
    sh 'docker compose -f production.yml build django codehelp-front'
    withCredentials([usernamePassword(credentialsId: 'DockerHub', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {

        sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
        sh 'docker tag codehelp-front:1.0 djangoreactdev/codehelp-front:1.0'
        sh 'docker push djangoreactdev/codehelp-front:1.0'
        sh 'docker tag codehelp-api:1.0 djangoreactdev/codehelp-api:1.0'
        sh 'docker push djangoreactdev/codehelp-api:1.0'
        // sh 'docker tag codehelp-dashboard:1.0 djangoreactdev/codehelp-dashboard:1.0'
        // sh 'docker push djangoreactdev/codehelp-dashboard:1.0'
    }
} 
  

// def deployApp() {
//     echo 'deploying the application...'
//     sh 'docker pull djangoreactdev/codehelp:1.0'
//     sh 'docker stop codehelp || true'
//     sh 'docker rm codehelp || true'
//     sh 'docker rmi codehelp || true'
//     sh 'docker pull djangoreactdev/codehelp:1.0'
//     sh 'docker run -d --name codehelp -p 82:3000 djangoreactdev/codehelp:1.0'
// } 

return this
