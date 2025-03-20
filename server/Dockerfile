FROM node:alpine
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./tsconfig.json ./
COPY ./src ./src
COPY ./dist ./dist
RUN npm install
RUN npx tsc



COPY ./data.csv ./
COPY ./.env ./
COPY ./config.js ./
CMD ["npm","start"]

