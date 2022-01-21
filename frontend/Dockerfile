#Primera parte-----------------------------------
FROM node:14 as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod

#Segunda parte-----------------------------------
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html
EXPOSE 4200