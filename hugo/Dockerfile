FROM nginx:1.15.2-alpine

WORKDIR /app

ADD https://github.com/gohugoio/hugo/releases/download/v0.119.0/hugo_0.119.0_Linux-64bit.tar.gz .
RUN tar xvf hugo_0.119.0_Linux-64bit.tar.gz hugo
RUN rm hugo_0.119.0_Linux-64bit.tar.gz

COPY . .

RUN ./hugo && cd cv-site && ../hugo

RUN cp -r public/* /usr/share/nginx/html

EXPOSE 80