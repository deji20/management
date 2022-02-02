IMAGE=$1
DESTINATION=$2
KEY=$3

docker save $IMAGE > ./${IMAGE}_tmp.tar
echo "$KEY" > ./key.pem && chmod 400 ./key.pem
sftp -o StrictHostKeyChecking=no -i key.pem $DESTINATION:. <<< $"put ./${IMAGE}_tmp.tar"
ssh -o StrictHostKeyChecking=no -i key.pem $DESTINATION "docker load -i ./${IMAGE}_tmp.tar && rm ${IMAGE}_tmp.tar"

if [[ -f  ./key.pem ]]; then
    rm key.pem
fi