FROM alpine:3.3
MAINTAINER Dmitry Pokidov

RUN apk add --update nodejs git python make g++ bash && rm -rf /var/cache/apk/*

ADD package.json /angular2/docker-lab/
ADD typings.json /angular2/docker-lab/
ADD index.html /angular2/docker-lab/
ADD tsconfig.json /angular2/docker-lab/
ADD bs-config.json /angular2/docker-lab/
ADD entrypoint.sh /angular2/docker-lab/
#RUN sed 's/^M$//' /angular2/docker-lab/entrypoint.sh > /angular2/docker-lab/entrypoint.sh
RUN chmod 755 /angular2/docker-lab/entrypoint.sh

WORKDIR /angular2/docker-lab
#RUN npm install -g tsd
RUN npm install -g watchy
RUN npm install

EXPOSE 3000 3001
VOLUME ["/angular2/docker-lab/app"]

ENTRYPOINT ["bash", "./entrypoint.sh"]
