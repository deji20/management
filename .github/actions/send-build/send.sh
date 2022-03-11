BUILD=$1
OUTPUT=$2
DESTINATION=$3
KEY=$4


echo "$KEY" > ./key.pem && chmod 400 ./key.pem
sftp -o StrictHostKeyChecking=no -i key.pem $DESTINATION:. <<< $"put ./${BUILD} ${OUTPUT}"

if [[ -f  ./key.pem ]]; then
    rm key.pem
fi