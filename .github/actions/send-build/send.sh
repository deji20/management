BUILD=$1
OUTPUT=$2
DESTINATION=$3
KEY=$4


echo "$KEY" > ./key.pem && chmod 400 ./key.pem
mv $BUILD $OUTPUT
sftp -o StrictHostKeyChecking=no -i key.pem $DESTINATION:. <<< $"put -r ${OUTPUT} "

if [[ -f  ./key.pem ]]; then
    rm key.pem
fi