FROM node:16-alpine

ENV HOST_OS=Linux
ENV HOST_UID=1000
ENV HOST_GID=1000
ENV DOCKER_USER='node'
ENV PROJECT_DIR=/app
ENV MODULES_DIR=/app/node_modules

RUN apk update

WORKDIR /app

COPY package.json .

COPY bash/*.sh /docker/
RUN chmod +x /docker/*.sh
ENTRYPOINT ["/docker/docker-entrypoint.sh"]

CMD ["su", "-", "node", "-c", "cd /app && npm run dev"]
