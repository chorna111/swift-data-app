FROM node:alpine
WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./package-lock.json ./
COPY ./jest.config.js ./
COPY ./tsconfig.json ./
COPY ./.env ./
COPY ./src ./src





COPY ./data.csv ./

COPY ./config.js ./
RUN npm install
RUN npx tsc
CMD ["npm", "start"]

