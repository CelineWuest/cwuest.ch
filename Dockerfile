FROM nginx:1.25.2-alpine

WORKDIR /app

RUN apk add hugo

COPY . .

RUN hugo

RUN cp -r public/* /usr/share/nginx/html

EXPOSE 80
