FROM node as builder 
WORKDIR /database

COPY . .
RUN npm install
RUN npm run build

FROM node:alpine
COPY --from=builder /database/build /app
COPY --from=builder /database/node_modules /app/node_modules
COPY --from=builder /database/public /app/public
WORKDIR /app
CMD ["node", "index.js"]
