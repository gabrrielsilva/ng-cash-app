FROM node:18-alpine
WORKDIR /app
COPY package.json yarn.* ./
RUN yarn
COPY . .
EXPOSE 3000
CMD ["yarn", "dev"]