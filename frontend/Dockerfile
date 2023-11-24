FROM node:16 as build

WORKDIR /app

COPY . /app/

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]

FROM nginx:latest

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/practico-final/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80