# ----------------------------
# Stage 1: Build Angular 20 app
# ----------------------------
FROM node:20 AS builder
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# ----------------------------
# Stage 2: Run with Nginx
# ----------------------------
FROM nginx:stable
COPY --from=builder /app/dist/MicroserviceGridShopFrontend/browser /usr/share/nginx/html

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
