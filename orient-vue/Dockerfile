#FROM node
 
#RUN npm install \
#    && nom run build

#COPY orient-vue/dist/ /usr/share/nginx/html/
  
#COPY nginx/default.conf /etc/nginx/conf.d/default.conf

FROM node:latest as builder
WORKDIR /app
COPY orient-vue/package.json .
COPY orient-vue/nginx.conf /etc/nginx/nginx.conf
RUN npm install
COPY orient-vue/ .
RUN npm run build


FROM nginx
#COPY nginx.conf /etc/nginx
COPY --from=builder /app/dist /usr/share/nginx/html
