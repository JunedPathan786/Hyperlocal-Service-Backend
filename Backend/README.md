# Service Marketplace Backend (starter)

## Features
- JWT authentication (User / Provider / Admin)
- Password hashing with bcrypt
- ES6 modules, Express, Mongoose (MongoDB Atlas)

## Setup
1. Clone repo
2. `npm install`
3. Create `.env` (see example)
4. Start dev server:
   - `npm run dev` (nodemon) or `npm start`

## Endpoints
- POST `/api/auth/register` { name, email, password, role? }
- POST `/api/auth/login` { email, password }
- GET `/api/user/me` - protected

## Notes
- Use `Authorization: Bearer <token>` header for protected endpoints
