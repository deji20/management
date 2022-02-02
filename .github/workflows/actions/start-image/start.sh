IMAGE=$1
SERVICE=$2
DESTINATION=$3
KEY=$4

echo "$KEY" > ./key.pem && chmod 400 ./key.pem
ssh -o StrictHostKeyChecking=no -i key.pem $DESTINATION << EOF
[[ ! -f .env ]] && touch .env
grep -Eq ^${SERVICE} .env || echo ${SERVICE} >> .env
sed -i "s/^${SERVICE}.*/${SERVICE}=${IMAGE}/g" .env
docker-compose up -d $SERVICE
echo "y" | docker image prune -a
EOF

if [[ -f  ./key.pem ]]; then
    rm key.pem
fi