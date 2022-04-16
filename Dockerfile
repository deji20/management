FROM node as builder 
WORKDIR /database

COPY . .
RUN npm install
RUN npm run build

FROM nginx:alpine
COPY --from=builder /database/build  /usr/share/nginx/html/management
