#!/bin/bash

if [ $1 == "-ios" ]
then
    echo "going to build ios"
    ionic cordova build ios --prod --release

    echo "code-push - going to release ios"
    code-push release-cordova LlgApp-iOS ios --deploymentName Production
elif [ $1 == "-android" ]
then
    echo "going to build android"
    ionic cordova build android --prod --release --buildConfig

    echo "code-push - going to release android"
    code-push release-cordova LlgApp-Android android --deploymentName Production
elif [ $1 == "-all" ]
then
    echo "going to build ios"
    ionic cordova build ios --prod --release

    echo "going to build android"
    ionic cordova build android --prod --release --buildConfig

    echo "code-push - going to release ios"
    code-push release-cordova LlgApp-iOS ios --deploymentName Production

    echo "code-push - going to release android"
    code-push release-cordova LlgApp-Android android --deploymentName Production

fi 

