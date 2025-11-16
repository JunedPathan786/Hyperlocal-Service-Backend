# Urban Company Backend Clone (CommonJS)

This is a compact, fully-featured backend API for an Urban Company-style service marketplace.  
Built with **MongoDB, Express, Node.js**, with JWT authentication, Razorpay payments, Cloudinary file uploads, and express-validator.

---

## Features

- User authentication (register/login) with JWT
- Roles: **User**, **Provider**, **Admin**
- Provider registration and profile
- Services CRUD with optional image upload
- Booking creation for services
- Payment integration using **Razorpay** (order creation + verification)
- Ratings & Reviews system
- Admin statistics endpoints
- Express-validator input checks
- Cloudinary file uploads
- Full CommonJS structure with **server.js** and **app.js**
- Error handling and async middleware

---

## Quick Start

1. Clone this repo:

```bash
git clone <repo-url>
cd urban-backend

```

## Install dependencies:

```
npm install

```

## Copy .env.example → .env and fill values:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/urban_company

JWT_ACCESS_SECRET=change_this_access_secret
JWT_REFRESH_SECRET=change_this_refresh_secret

CORS_ORIGINE=http://localhost:3000

RAZORPAY_KEY_ID=<YOUR_KEY_ID>
RAZORPAY_KEY_SECRET=<YOUR_KEY_SECRET>

CLOUDINARY_NAME=<YOUR_CLOUD_NAME>
CLOUDINARY_API_KEY=<YOUR_API_KEY>
CLOUDINARY_API_SECRET=<YOUR_API_SECRET>

```

## Start server in development:

```
npm run dev

```

## Folder Structure

```
urban-backend/
├── server.js       # entry point
├── app.js          # express app + routes
├── config/
├── controllers/
├── middlewares/
├── models/
├── routes/
├── utils/
├── package.json
└── .env.example

```

## Example Requests

```
Refer to the curl examples in the documentation above for:

User registration/login

Apply as provider

Create/list services

Book a service

Razorpay order creation & payment verification

Add reviews

Admin stats

```

## NOTE

```
Use MongoDB Compass or Atlas for database.

Replace Razorpay dummy keys with production keys for live payments.

Add express-validator in any new route for input validation.

```

## Postman collection JSON

```

{
  "info": {
    "name": "Urban Backend API",
    "_postman_id": "urban-backend-collection",
    "description": "MERN stack backend API for Urban Company clone. Includes OTP-based auth, providers, services, bookings, payments, reviews, admin panel.",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Auth",
      "item": [
        {
          "name": "Registration",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"fullname\": \"test test\",\n  \"email\": \"user@test.com\"\n,\n  \"password\": \"9999999999\",\n  \"phone\": \"9999999999\"}"
            },
            "url": {
              "raw": "http://localhost:5000/api/v1/auth/send-otp",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "auth", "registration"]
            }
          }
        },
        {
          "name": "Verify OTP",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"user@test.com\",\n  \"otp\": \"123456\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/v1/auth/verify-otp",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "auth", "verify-otp"]
            }
          }
        },
        {
          "name": "Logout User",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/v1/auth/logout",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "auth", "logout"]
            }
          }
        },
        {
          "name": "Get My Profile",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/user/me",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "user", "me"]
            }
          }
        }
      ]
    },
    {
      "name": "Providers",
      "item": [
        {
          "name": "Apply as Provider",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"bio\": \"Experienced AC repair technician\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/v1/provider/apply",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "provider", "apply"]
            }
          }
        }
      ]
    },
    {
      "name": "Services",
      "item": [
        {
          "name": "Create Service",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              }
            ],
            "body": {
              "mode": "formdata",
              "formdata": [
                { "key": "title", "value": "AC Repair", "type": "text" },
                { "key": "description", "value": "Fix your AC quickly", "type": "text" },
                { "key": "basePrice", "value": "500", "type": "text" },
                { "key": "category", "value": "Electrical", "type": "text" }
              ]
            },
            "url": {
              "raw": "http://localhost:5000/api/v1/service",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "service"]
            }
          }
        },
        {
          "name": "List Services",
          "request": {
            "method": "GET",
            "url": {
              "raw": "http://localhost:5000/api/v1/service",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "service"]
            }
          }
        }
      ]
    },
    {
      "name": "Bookings",
      "item": [
        {
          "name": "Create Booking",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"serviceId\": \"<SERVICE_ID>\",\n  \"scheduledAt\": \"2025-10-20T10:00:00Z\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/v1/booking",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "booking"]
            }
          }
        },
        {
          "name": "Get User Bookings",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/v1/booking/me",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "booking", "me"]
            }
          }
        }
      ]
    },
    {
      "name": "Payments",
      "item": [
        {
          "name": "Create Razorpay Order",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"bookingId\":\"<BOOKING_ID>\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/v1/payment/order",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "payment", "order"]
            }
          }
        },
        {
          "name": "Verify Payment",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"razorpay_order_id\":\"<ORDER_ID>\",\n  \"razorpay_payment_id\":\"<PAYMENT_ID>\",\n  \"razorpay_signature\":\"<SIGNATURE>\",\n  \"bookingId\":\"<BOOKING_ID>\",\n  \"amount\":500\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/v1/payment/verify",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "payment", "verify"]
            }
          }
        }
      ]
    },
    {
      "name": "Reviews",
      "item": [
        {
          "name": "Add Review",
          "request": {
            "method": "POST",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <TOKEN>"
              },
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"bookingId\":\"<BOOKING_ID>\",\n  \"providerId\":\"<PROVIDER_ID>\",\n  \"rating\":5,\n  \"comment\":\"Great service!\"\n}"
            },
            "url": {
              "raw": "http://localhost:5000/api/v1/review",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "review"]
            }
          }
        }
      ]
    },
    {
      "name": "Admin",
      "item": [
        {
          "name": "Get Admin Stats",
          "request": {
            "method": "GET",
            "header": [
              {
                "key": "Authorization",
                "value": "Bearer <ADMIN_TOKEN>"
              }
            ],
            "url": {
              "raw": "http://localhost:5000/api/v1/admin/stats",
              "protocol": "http",
              "host": ["localhost"],
              "port": "5000",
              "path": ["api", "v1", "admin", "stats"]
            }
          }
        }
      ]
    }
  ]
}


```