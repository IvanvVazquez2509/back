FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./ 
COPY tsconfig.json ./ 
COPY . .

RUN npm install --force --verbose
RUN npm run build

EXPOSE 3000

RUN chown -R node /usr/src/app

USER node

CMD ["node", "./dist/src/app.js"]
