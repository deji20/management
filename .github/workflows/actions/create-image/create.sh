USER=$1
PASS=$2
IMAGE=$3

# login to dockerhub, to retrieve the base docker image
# Build docker file and logout again
echo "$PASS" | docker login -u $USER --password-stdin && docker build -t $IMAGE . && docker logout