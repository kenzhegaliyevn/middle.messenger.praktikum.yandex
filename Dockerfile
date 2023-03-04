FROM node:16.14
WORKDIP /var/www
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE $PORT
CMD npm run start