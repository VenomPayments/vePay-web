FROM node:18-slim as dev
RUN apt update
RUN apt install -y python3 build-essential git
RUN mkdir "app"
WORKDIR app
COPY ./package.json .
COPY ./yarn.lock .
RUN yarn
CMD ["yarn", "dev"]

FROM dev as build
COPY ./ .
RUN yarn build

FROM nginx:latest
COPY --from=build /app/dist /www/
COPY ./etc/nginx.conf /etc/nginx/conf.d/default.conf
