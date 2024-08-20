FROM node

COPY . .

RUN npm install

CMD [ "npm", "start" ]

EXPOSE 5000