FROM node:16-alpine

# set up the user and permission for the app dir
RUN addgroup app && adduser -S -G app app
USER app

# set up workdir
WORKDIR /app

COPY package.json .

RUN npm install

CMD ["npm", "run", "serve"]
