FROM node:16-alpine

WORKDIR Leave-Management-System-lms_current/frontend

COPY package*.json /Leave-Management-System-lms_current/frontend/
RUN npm install

COPY . /Leave-Management-System-lms_current/frontend

CMD ["npm", "start"]