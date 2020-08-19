#!/bin/bash
# Deploy script for deploying application to kubernetes

if [[ -f Dockerfile ]]; then
    echo "Pulling containers..."
    docker pull "${DOCKER_ID}/${CLIENT_NAME}:${CLIENT_VER}"
    docker pull "${DOCKER_ID}/${SERVER_NAME}:${SERVER_VER}"

    echo "Pushing to Docker Registry..."
    docker tag "${DOCKER_ID}/${CLIENT_NAME}:${CLIENT_VER}" "${DOCKER_ID}/${CLIENT_NAME}:latest"
    docker push "${DOCKER_ID}/${CLIENT_NAME}:latest"
    docker tag "${DOCKER_ID}/${CLIENT_NAME}:${CLIENT_VER}" "${DOCKER_ID}/${CLIENT_NAME}:stable"
    docker push "${DOCKER_ID}/${CLIENT_NAME}:stable"

    docker tag "${DOCKER_ID}/${SERVER_NAME}:${SERVER_VER}" "${DOCKER_ID}/${SERVER_NAME}:latest"
    docker push "${DOCKER_ID}/${SERVER_NAME}:latest"
    docker tag "${DOCKER_ID}/${SERVER_NAME}:${SERVER_VER}" "${DOCKER_ID}/${SERVER_NAME}:stable"
    docker push "${DOCKER_ID}/${SERVER_NAME}:stable"
    echo " "
else
    echo "No Dockerfile found at Dockerfile" 1>&2
    exit 1
fi

echo "Done updating tags on stable resources!"