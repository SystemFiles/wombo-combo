#!/bin/bash
# Deploy script for deploying application to kubernetes

echo "Logging into Docker Registry..."
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_ID" --password-stdin
echo "Done!"
echo ""

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
echo ""

echo "Done updating tags on stable resources!"
