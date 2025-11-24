# 🛍️ MicroserviceGridShopFrontend 🅰️

**MicroserviceGridShopFrontend** is the frontend application of the **Microservice Grid** ecosystem.  
This Angular-based client communicates with the API Gateway and backend microservices to deliver a modular and scalable shopping interface.

---

## 🚀 Features

- Product catalog fetched from **Product Service**
- Inventory availability from **Inventory Service**
- OrderService creation through **OrderService Service**
- Secure integration via **API Gateway**
- Angular 20 standalone architecture
- Modular structure prepared for future expansion (Cart, Auth, Payments, Admin Panel)

---

## 🛠️ Tech Stack

- **Angular 20**
- **TypeScript**
- **RxJS**
- **Angular Router**
- **SCSS**
- **REST communication through API Gateway**
- **Docker-ready production build**

---

## 📦 Project Structure
```yml
  src/
  ├── app/
  │ ├── core/
  │ ├── shared/
  │ ├── features/
  │ │ ├── products/
  │ │ ├── orders/
  │ │ └── inventory/
  │ └── app.routes.ts
  ├── assets/
  └── environments/
```

---

## ⚙️ Development Setup

### 1. Install dependencies

```bash
npm install
```
2. Start the development server
```bash
ng serve
```
Open in browser:

http://localhost:4200/
Hot-reload works automatically.

## 🧱 Production Build
```bash
ng build --configuration production
```
The build output will be generated inside the:
```bash
dist/microservice-grid-shop-frontend/
```
You can serve it using Nginx, Docker, or any static hosting.

---

## 🧪 Code Scaffolding
Generate new components:
```bash
ng generate component component-name
```
View all available schematics:
```bash
ng generate --help
```

---

## 🔌 API Integration
All backend communication goes through the API Gateway:

Endpoint	Description
/api/v1/products	Product catalog
/api/v1/inventory	Inventory check
/api/v1/order	Create order

Environment config:
``` bash
src/environments/environment.ts
```
---

## 🧰 Docker Build (optional)
``` bash
docker build -t microservice-grid-frontend .
docker run -p 4200:80 microservice-grid-frontend
```
---

## 🔮 Planned Features
 - Keycloak Authentication (Login / Register)

 - User profile & session handling

 - Shopping cart & checkout page

 - Payment interaction via Pay Service

 - Admin Dashboard (Products, Inventory, Orders)

 - Weather & Currency integration widgets

---

## 👤 Author
Andrii Kulynch
Part of the Microservice Grid distributed system.
