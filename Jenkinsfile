#!/usr/bin/env groovy

def gv

pipeline {
    agent {
        label 'developer'
    }

    stages {
        stage("init") {
            steps {
                script {
                    gv = load "script.groovy"
                }
            }
        }
        stage("build") {
            steps {
                script {
                    gv.buildJar()
                }
            }
        }
        stage("build image") {
            steps {
                script {
                    gv.buildImage()
                }
            }
        }
        stage('Trigger deploy job') {
            steps {
                build job: 'deploy-with-swarm-traefik', parameters: [
                    // Specify any parameters if required
                    // Example: [string(name: 'PARAM_NAME', value: 'PARAM_VALUE')]
                ]
            }
        }
        // stage("deploy") {
        //     agent {
        //         label 'production'
        //     }
        //     steps {
        //         script {
        //             gv.deployApp()
        //         }
        //     }
        // }
    }
}
