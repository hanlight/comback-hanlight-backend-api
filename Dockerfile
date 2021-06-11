FROM node:14.15.4

RUN echo "Asia/Seoul" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

RUN mkdir -p /app

WORKDIR /app

ADD ./ /app

RUN npm install

EXPOSE 8000

CMD npm run start