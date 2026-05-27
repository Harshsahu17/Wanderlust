# 🧭 Wanderlust

> An Airbnb-inspired full-stack travel listing platform where users can explore, host, and review stays from around the world.

## 📑 Table of Contents

- [Overview](#-overview)
- [Live Demo](#-live-demo)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Database Initialization](#-database-initialization)
- [API Routes](#-api-routes)
- [Screenshots](#-screenshots)
- [Known Issues & Future Improvements](#-known-issues--future-improvements)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌍 Overview

**Wanderlust** is a full-stack web application inspired by Airbnb. It allows users to:

- Browse travel listings from across the globe
- Create and manage their own listings with image uploads
- Leave star-rated reviews on listings
- Filter by category (beaches, mountains, castles, etc.)
- Search listings by title, location, or country
- Toggle prices to show tax-inclusive totals

Built as a learning project to practice the **MEN stack** (MongoDB, Express, Node.js) with server-side rendering via **EJS**.

---

## 🚀 Live Demo

> [ Deploy link here_](https://wanderlust-nrpz.onrender.com/listings)

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login via **Passport.js** (Local Strategy)
- Session persistence using **connect-mongo** (MongoDB-backed sessions)
- Protected routes — only logged-in users can create listings or write reviews
- **Ownership checks** — only the listing owner can edit or delete their listing
- **Author checks** — only the review author can delete their review
- Flash messages for success and error feedback

### 🏠 Listings (CRUD)
- **Create** a new listing with title, description, price, location, country, category, and image
- **Read** all listings on the home page or view a single listing's detail page
- **Update** listing details including replacing the uploaded image
- **Delete** a listing (cascades to delete all associated reviews via Mongoose middleware)
- Image uploads handled by **Multer** and stored on **Cloudinary**

### ⭐ Reviews
- Logged-in users can leave a **star rating (1–5)** and a text comment
- Star ratings rendered with an accessible **CSS-only star widget** (Starability)
- Review authors can delete their own reviews
- Reviews are **populated** on the listing show page with author usernames

### 🔎 Search & Filter
- **Keyword search** across listing title, location, and country (case-insensitive regex)
- **Category filter** with 11 categories: Trending, Rooms, Iconic Cities, Mountains, Castles, Amazing Pools, Camping, Farms, Arctic, Beaches, Desi Villas
- Active filter is visually highlighted in the filter bar
- "Clear Filter" button appears when a filter or search is active
- Empty state shown when no listings match the query

### 💰 Tax Toggle
- Switch to display prices with **18% GST** included
- Smooth toggle updates all listing cards instantly without a page reload

### 📱 Responsive Design
- Fully responsive layout using **Bootstrap 5** grid system
- Mobile-first CSS with custom breakpoints for phones, tablets, and desktops
- Horizontally scrollable filter bar on mobile
- Adaptive navbar with collapsible menu and always-visible search bar

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (v25) |
| Framework | Express.js v5 |
| Database | MongoDB Atlas |
| ODM | Mongoose v9 |
| Templating | EJS + EJS-Mate (layouts) |
| Authentication | Passport.js + passport-local-mongoose |
| Session Store | connect-mongo |
| File Uploads | Multer + multer-storage-cloudinary |
| Cloud Storage | Cloudinary |
| Validation | Joi |
| Styling | Bootstrap 5 + Custom CSS |
| Icons | Font Awesome 7 |
| Dev Tool | Nodemon |

---

## 📁 Project Structure

```
wanderlust/
├── controllers/
│   ├── listings.js        # Listing CRUD logic
│   ├── reviews.js         # Review create/delete logic
│   └── users.js           # Signup, login, logout logic
│
├── models/
│   ├── listing.js         # Listing schema + cascade delete middleware
│   ├── review.js          # Review schema
│   └── user.js            # User schema + passport-local-mongoose plugin
│
├── routes/
│   ├── listing.js         # /listings routes
│   ├── review.js          # /listings/:id/reviews routes
│   └── user.js            # /signup, /login, /logout routes
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   ├── includes/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   └── flash.ejs
│   ├── listings/
│   │   ├── index.ejs      # All listings + filters
│   │   ├── show.ejs       # Single listing + reviews
│   │   ├── new.ejs        # Create listing form
│   │   └── edit.ejs       # Edit listing form
│   ├── users/
│   │   ├── login.ejs
│   │   └── signup.ejs
│   └── error.ejs
│
├── public/
│   ├── css/
│   │   ├── style.css
│   │   └── rating.css     # Starability star widget
│   └── js/
│       └── script.js      # Bootstrap validation
│
├── utils/
│   ├── ExpressError.js    # Custom error class
│   └── wrapAsync.js       # Async error wrapper
│
├── init/
│   ├── data.js            # Sample listings seed data
│   └── index.js           # DB seed script
│
├── cloudConfig.js         # Cloudinary + Multer storage config
├── middleware.js          # Auth, ownership, validation middleware
├── schema.js              # Joi validation schemas
├── app.js                 # Express app entry point
├── .env                   # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account (or local MongoDB)
- A [Cloudinary](https://cloudinary.com/) account

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/wanderlust.git
   cd wanderlust
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory (see [Environment Variables](#-environment-variables) section below).

4. **Seed the database** _(optional)_

   ```bash
   node init/index.js
   ```

5. **Start the development server**

   ```bash
   node app.js
   ```

   Or with auto-restart via Nodemon:

   ```bash
   npx nodemon app.js
   ```

6. **Open in browser**

   ```
   http://localhost:8080
   ```

---

## 🔑 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# MongoDB Atlas connection string
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/wanderlust?retryWrites=true&w=majority

# Session secret (use a long random string)
SECRET=your_super_secret_session_key

# Cloudinary credentials (from your Cloudinary dashboard)
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

# Optional: Port (defaults to 8080)
PORT=8080
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## 🌱 Database Initialization

To populate the database with 29 sample listings:

```bash
node init/index.js
```

> **Note:** This will **delete all existing listings** before inserting the sample data. Update the `owner` field in `init/index.js` with a valid user `_id` from your database before running this script.

```js
// init/index.js — update this line with a real user _id
initData.data = initData.data.map((obj) => ({
  ...obj,
  owner: "YOUR_USER_ID_HERE"
}));
```

---

## 🛣 API Routes

### Listings

| Method | Route | Description | Auth Required |
|--------|-------|-------------|:---:|
| GET | `/listings` | Browse all listings (supports `?search=` and `?category=`) | ❌ |
| GET | `/listings/new` | Render create listing form | ✅ |
| POST | `/listings` | Create a new listing | ✅ |
| GET | `/listings/:id` | View a single listing | ❌ |
| GET | `/listings/:id/edit` | Render edit listing form | ✅ Owner only |
| PUT | `/listings/:id` | Update a listing | ✅ Owner only |
| DELETE | `/listings/:id` | Delete a listing | ✅ Owner only |

### Reviews

| Method | Route | Description | Auth Required |
|--------|-------|-------------|:---:|
| POST | `/listings/:id/reviews` | Create a review | ✅ |
| DELETE | `/listings/:id/reviews/:reviewId` | Delete a review | ✅ Author only |

### Users

| Method | Route | Description | Auth Required |
|--------|-------|-------------|:---:|
| GET | `/signup` | Render signup form | ❌ |
| POST | `/signup` | Register new user | ❌ |
| GET | `/login` | Render login form | ❌ |
| POST | `/login` | Authenticate user | ❌ |
| GET | `/logout` | Log out user | ✅ |

---


## 🐛 Known Issues & Future Improvements

### Known Issues
- The `init/index.js` seed script requires a hardcoded valid `owner` ObjectId
- No server-side pagination for listings yet

### Planned Features
- [ ] Interactive map integration (Mapbox / Leaflet) on listing show page
- [ ] Booking / reservation system with date picker
- [ ] User profile page with owned listings
- [ ] Wishlist / favourites feature
- [ ] Pagination for listings index
- [ ] Email verification on signup
- [ ] Admin dashboard
- [ ] Progressive Web App (PWA) support

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "Add: your feature description"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please make sure your code follows the existing style and all routes are protected appropriately.

---

## 📄 License

This project is licensed under the **ISC License**.

---

## 🙏 Acknowledgements

- [Airbnb](https://www.airbnb.com/) — design inspiration
- [Unsplash](https://unsplash.com/) — sample listing images
- [Starability](https://github.com/LunarLogic/starability) — accessible CSS star rating widget
- [Bootstrap](https://getbootstrap.com/) — UI framework
- [Font Awesome](https://fontawesome.com/) — icons
- [Cloudinary](https://cloudinary.com/) — image hosting
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) — cloud database

---

<p align="center">Made with ❤️ by <a href="https://github.com/Harshsahu17">Harsh Sahu</a></p>
