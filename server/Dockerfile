FROM node:lts-alpine 
WORKDIR /app
COPY package.json yarn.* ./
COPY ./src ./src
RUN yarn 
COPY . .
EXPOSE 8080
CMD ['yarn', 'start']