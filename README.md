# 🍽️ FoodMatch - Recipe Discovery App

A beautiful, modern web application for discovering recipes based on available ingredients. Built with React, TypeScript, and Express.js.

## 🎯 Features

- **Ingredient-Based Recipe Discovery** - Find recipes by selecting ingredients you have
- **Smart Matching Algorithm** - Recipes ranked by match quality and cooking time
- **Shopping List** - Add recipe ingredients to a smart shopping list
- **Responsive Design** - Beautiful dark theme with glassmorphism effects
- **Real-time Search** - Search and filter ingredients dynamically
- **Progress Tracking** - Visual progress indicator on shopping list

## 🏗️ Project Structure

This is a **monorepo** containing both backend and frontend:

```
cooking-app/
├── backend/           # Express.js REST API (Port 3000)
├── frontend/          # React + Vite app (Port 5173)
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or bun

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

**API runs on:** `http://localhost:3000`

**Available Endpoints:**
- `GET /recipes` - Get all recipes
- `GET /recipes/:id` - Get recipe details
- `POST /recipes/match` - Find recipes by ingredients
- `POST /shopping-list/from-recipe` - Add recipe to shopping list

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

**App runs on:** `http://localhost:5173`

## 🎨 Design

- **Theme:** Dark mode with green accent (Glassmorphism)
- **Icons:** Lucide React
- **Styling:** Tailwind CSS 3
- **Font:** Nunito (Google Fonts)

## 📊 Data

### Sample Recipes
The app includes **15 seed recipes** across three meal types:
- 🌅 Breakfast (Pancakes, Oatmeal, Eggs, etc.)
- ☀️ Lunch (Salad, Sandwich, Pasta, etc.)
- 🌙 Dinner (Steak, Salmon, Risotto, etc.)

Each recipe includes:
- Ingredients with quantities
- Cooking instructions
- Nutritional info (calories, protein, fat, carbs)
- Cook time
- Meal type

## 🔄 How It Works

1. **Select Meal Type** - Choose breakfast, lunch, or dinner
2. **Select Ingredients** - Pick ingredients you have on hand
3. **Find Recipes** - Get ranked results by match quality
4. **View Details** - See full recipe with ingredients and steps
5. **Add to Shopping** - One-click adding of missing ingredients
6. **Manage List** - Check off items as you shop

### Matching Algorithm

Recipes are ranked by:
1. **Missing Ingredients** ↓ (fewer missing = better)
2. **Matched Ingredients** ↓ (more matches = better)
3. **Cook Time** ↑ (faster = better)

Example: If you have eggs, butter, and flour, recipes with all three ingredients score 100%, while recipes missing milk score lower.

## 🛠️ Tech Stack

### Backend
- **Framework:** Express.js
- **Language:** TypeScript (strict mode)
- **Storage:** JSON (file-based)
- **Port:** 3000

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS 3
- **HTTP Client:** Axios
- **Routing:** React Router v6
- **State:** React Context API
- **Icons:** Lucide React
- **Port:** 5173

## 📝 API Examples

### Match Recipes by Ingredients

**Request:**
```bash
POST /recipes/match
Content-Type: application/json

{
  "selectedIngredients": ["eggs", "butter", "flour"],
  "mealType": "breakfast"
}
```

**Response:**
```json
[
  {
    "id": "recipe-1",
    "title": "Pancakes",
    "matchCount": 3,
    "missingCount": 1,
    "missingIngredients": [
      { "name": "milk", "amount": "200ml", "category": "Dairy" }
    ],
    "calories": 350,
    "protein": 12,
    "fat": 8,
    "carbs": 58,
    "cookTime": 15,
    "mealType": "breakfast"
  }
]
```

## 🎯 Pages

- **Home (`/`)** - Main discovery interface
- **Recipe Details (`/recipe/:id`)** - Full recipe view
- **Shopping List (`/shopping`)** - Ingredient shopping list

## 🔐 Security

- Input validation on backend
- CORS enabled for local development
- Environment variables for configuration

## 📦 Deployment

### Backend
```bash
cd backend
npm install
npm run build  # Compiles TypeScript
npm start      # Runs compiled JavaScript
```

### Frontend
```bash
cd frontend
npm install
npm run build  # Builds to dist/
npm run preview  # Preview production build
```

## 📄 License

MIT

## 👨‍💻 Author

mykolaantoniv

---

Made with ❤️ for food lovers 🍽️
