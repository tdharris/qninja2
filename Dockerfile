FROM node:8

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY server/package*.json ./

RUN npm install

# Bundle app source
COPY server .

EXPOSE 80
EXPOSE 443

CMD [ "npm", "start" ]
