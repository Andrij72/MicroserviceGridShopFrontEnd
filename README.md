# 🛍️ MicroserviceGridShopFrontend 🅰️

**MicroserviceGridShopFrontend** is the frontend application of the **Microservice Grid** ecosystem.  
This Angular-based client communicates with the API Gateway and backend microservices to deliver a modular and scalable shopping interface.


# Admin Panel for E-Commerce Platform

![Angular](https://img.shields.io/badge/Angular-20-red?logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Docker](https://img.shields.io/badge/Docker-Ready-0db7ed?logo=docker)
![Microservices](https://img.shields.io/badge/Architecture-Microservices-green)
![Spring](https://img.shields.io/badge/Backend-Spring%20Boot-brightgreen?logo=spring)

Admin panel for managing products, orders and users.  
Built with Angular 20 and designed to work with a microservice backend architecture.

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
```text
src/
  app/
    core/
      auth/
        auth.config.ts
        auth.interceptor.ts
      header/
        header.component.html
        header.component.scss
        header.component.ts
    order/
      data-access/
        cart.service.ts
        order.service.ts
      feature-cart/
        cart.component.html
        cart.component.scss
        cart.component.ts
      feature-orders/
        orders.component.html
        orders.component.scss
        orders.component.ts
      model/
        cart-item.model.ts
        order-create.request.ts
        order.model.ts
    product/
      data-access/
        admin-product.service.ts
      feature-list/
        product-list.component.html
        product-list.component.scss
        product-list.component.ts
      feature-details/
        product-details.component.html
        product-details.component.scss
        product-details.component.ts
      model/
        admin-product.model.ts
    pages/
      admin/
      home/
```

---
## 🔌 API Integration

| Endpoint          | Method | Description              |
|-------------------|--------|--------------------------|
| /api/v1/products  | GET    | Fetch all products       |
| /api/v1/inventory | GET    | Check stock availability |
| /api/v1/orders    | POST   | Create order  <br/>      | 

**Order Payload Example**
```json
{
  "items": [
    {
      "sku": "iphone-15",
      "productName": "iPhone 15",
      "price": 999,
      "quantity": 1
    }
  ],
  "userDetails": {
    "email": "user@test.com",
    "firstName": "John",
    "lastName": "Doe"
  }
}
```
---

## 📈 User Flow / Architecture Diagram

```mermaid
flowchart TD
    User -->|Interacts with| Frontend[Angular Frontend - Products Cart Orders]
    Frontend -->|Calls API| Gateway[API Gateway]

    subgraph Microservices["Microservice Grid"]
        Product[Product Service]
        Inventory[Inventory Service]
        Order[Order Service]
    end
    
    Gateway --> Product
    Gateway --> Inventory
    Gateway --> Order
```

---
 

## 📸 Screenshots

#### Home
![Home](screenshots/home-grid.png)

#### Login
![Login](screenshots/login-grid.png)

### Client Dashboard
![List products](screenshots/client-products-grid.png)

### Product details
![List products](screenshots/details-products-grid.png)

#### Client Cart 
![Client Cart](screenshots/client-cart-grid.png)

#### Create order
![Create Order](screenshots/create-order-grid.png)

### Admin Dashboard
#### Product List (Grid View)
![Products](screenshots/products-grid.png)

#### Product Edit Form
![Edit Product](screenshots/products-edit.png)

#### Create new Product Form
![Edit Product](screenshots/admin-create-new-product-grid.png)

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
