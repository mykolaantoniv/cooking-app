# Cooking Assistant API - MVP Backend

Production-quality Node.js/TypeScript backend for the cooking assistant app. Supports the core user flow: ingredient selection → recipe matching → recipe details → shopping list.

## Quick Start

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Server starts on `http://localhost:3000`

### Build for production
```bash
npm run build
npm start
```

---

## Architecture

### Project Structure
```
src/
├── models/           # Data types and storage layer
│   ├── types.ts     # TypeScript interfaces
│   ├── Recipe.ts    # Recipe data model
│   └── ShoppingList.ts  # Shopping list in-memory store
├── services/        # Business logic
│   ├── RecipeService.ts     # Recipe queries
│   ├── MatchingService.ts   # Recipe matching algorithm
│   └── ShoppingService.ts   # Shopping list operations
├── routes/          # HTTP endpoints
│   ├── recipes.ts   # Recipe endpoints
│   └── shopping.ts  # Shopping list endpoints
├── data/
│   └── recipes.json # Recipe seed data (15 recipes)
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

### Core Algorithm: Recipe Matching

**Input:** Selected ingredients + meal type

**Steps:**
1. Filter recipes by meal type
2. For each recipe:
   - Count how many selected ingredients it contains (matchCount)
   - Identify ingredients not in selection (missingIngredients)
3. Sort by ranking priority:
   - Fewer missing ingredients first (ASC)
   - More matches second (DESC)
   - Faster cook time third (ASC)
4. Return all recipes (including 0 matches)

**Normalization:** Ingredient names are normalized (lowercase, trimmed) for case-insensitive matching.

---

## API Endpoints

### 1. GET `/recipes`
Get all recipes or filter by meal type.

**Query Parameters:**
- `mealType` (optional): "breakfast", "lunch", or "dinner"

**Example:**
```bash
curl http://localhost:3000/recipes
curl http://localhost:3000/recipes?mealType=breakfast
```

**Response:**
```json
{
  "recipes": [
    {
      "id": "recipe-001",
      "title": "Buttermilk Pancakes",
      "mealType": "breakfast",
      "cookTime": 20,
      "calories": 280,
      "protein": 8,
      "fat": 6,
      "carbs": 48,
      "ingredients": [
        { "name": "buttermilk", "amount": "200ml", "category": "Dairy" },
        ...
      ],
      "steps": [...]
    }
  ]
}
```

---

### 2. GET `/recipes/:id`
Get full recipe details by ID.

**Example:**
```bash
curl http://localhost:3000/recipes/recipe-001
```

**Response:**
```json
{
  "id": "recipe-001",
  "title": "Buttermilk Pancakes",
  "mealType": "breakfast",
  "cookTime": 20,
  "calories": 280,
  "protein": 8,
  "fat": 6,
  "carbs": 48,
  "ingredients": [
    { "name": "buttermilk", "amount": "200ml", "category": "Dairy" },
    { "name": "eggs", "amount": "2", "category": "Eggs" },
    ...
  ],
  "steps": [
    "Mix dry ingredients in a bowl",
    "Combine wet ingredients separately",
    ...
  ]
}
```

---

### 3. POST `/recipes/match`
Match recipes based on selected ingredients.

**Body:**
```json
{
  "selectedIngredients": ["eggs", "flour", "butter"],
  "mealType": "breakfast"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/recipes/match \
  -H "Content-Type: application/json" \
  -d '{
    "selectedIngredients": ["eggs", "flour", "butter"],
    "mealType": "breakfast"
  }'
```

**Response:**
```json
{
  "recipes": [
    {
      "id": "recipe-002",
      "title": "Simple Omelette",
      "mealType": "breakfast",
      "cookTime": 10,
      "calories": 200,
      "protein": 12,
      "fat": 10,
      "carbs": 2,
      "matchCount": 2,
      "missingCount": 2,
      "missingIngredients": [
        { "name": "salt", "amount": "1g", "category": "Seasoning" },
        { "name": "cheese", "amount": "30g", "category": "Dairy" }
      ]
    },
    {
      "id": "recipe-001",
      "title": "Buttermilk Pancakes",
      "mealType": "breakfast",
      "cookTime": 20,
      "calories": 280,
      "protein": 8,
      "fat": 6,
      "carbs": 48,
      "matchCount": 3,
      "missingCount": 4,
      "missingIngredients": [
        { "name": "buttermilk", "amount": "200ml", "category": "Dairy" },
        { "name": "sugar", "amount": "20g", "category": "Dry Goods" },
        { "name": "baking powder", "amount": "5g", "category": "Dry Goods" },
        { "name": "salt", "amount": "1g", "category": "Seasoning" }
      ]
    }
  ]
}
```

---

### 4. POST `/shopping-list/from-recipe`
Add all ingredients from a recipe to the shopping list.

**Body:**
```json
{
  "recipeId": "recipe-001"
}
```

**Example:**
```bash
curl -X POST http://localhost:3000/shopping-list/from-recipe \
  -H "Content-Type: application/json" \
  -d '{
    "recipeId": "recipe-001"
  }'
```

**Response:**
```json
{
  "success": true,
  "itemsAdded": 7,
  "items": [
    { "id": "item-1", "name": "buttermilk", "amount": "200ml", "category": "Dairy", "checked": false },
    { "id": "item-2", "name": "eggs", "amount": "2", "category": "Eggs", "checked": false },
    ...
  ]
}
```

---

## Complete Example Flow

### Step 1: Get available ingredients
```bash
curl http://localhost:3000/recipes?mealType=breakfast
```

### Step 2: Select ingredients and find matches
```bash
curl -X POST http://localhost:3000/recipes/match \
  -H "Content-Type: application/json" \
  -d '{
    "selectedIngredients": ["eggs", "flour", "butter"],
    "mealType": "breakfast"
  }'
```

### Step 3: View recipe details
```bash
curl http://localhost:3000/recipes/recipe-002
```

### Step 4: Add recipe to shopping list
```bash
curl -X POST http://localhost:3000/shopping-list/from-recipe \
  -H "Content-Type: application/json" \
  -d '{
    "recipeId": "recipe-002"
  }'
```

---

## Data

### Seed Recipes (15 total)
The app includes 15 pre-loaded recipes across 3 meal types:

**Breakfast (4 recipes):**
- Buttermilk Pancakes
- Simple Omelette
- Scrambled Eggs with Toast
- Fruit Smoothie

**Lunch (5 recipes):**
- Greek Salad
- Grilled Chicken Breast
- Pasta Carbonara
- Caesar Salad
- Vegetable Soup

**Dinner (6 recipes):**
- Vegetable Stir-Fry
- Salmon with Lemon
- Beef Tacos
- Mushroom Risotto
- Chicken Curry
- Beef Bolognese

All recipes include:
- ID, title, meal type
- Cook time (minutes)
- Nutritional info (calories, protein, fat, carbs)
- Ingredient list with amounts and categories
- Step-by-step cooking instructions

### Storage
- **Recipes:** Stored in `src/data/recipes.json` (read-only for MVP)
- **Shopping List:** In-memory (clears on server restart)

---

## Development

### TypeScript Compilation
```bash
npm run type-check   # Check types without building
npm run build        # Build to dist/
```

### Stack Details
- **Framework:** Express.js
- **Language:** TypeScript (strict mode)
- **Node:** 16+
- **Port:** 3000 (configurable via PORT env var)

---

## MVP Scope

✅ **Included:**
- Recipe catalog with 15 recipes
- Recipe matching algorithm
- Shopping list management
- Full REST API
- TypeScript types
- Production-ready structure

❌ **Not included (future):**
- Database (PostgreSQL, MongoDB)
- Authentication / Authorization
- Subscription / Paywalls
- User profiles / Preferences
- Meal planning
- Multi-user support
- Persistent storage

---

## Files Overview

| File | Purpose |
|------|---------|
| `src/models/types.ts` | TypeScript interfaces |
| `src/models/Recipe.ts` | Recipe data model |
| `src/models/ShoppingList.ts` | Shopping list in-memory store |
| `src/services/RecipeService.ts` | Recipe queries |
| `src/services/MatchingService.ts` | Matching algorithm (core logic) |
| `src/services/ShoppingService.ts` | Shopping list operations |
| `src/routes/recipes.ts` | Recipe endpoints |
| `src/routes/shopping.ts` | Shopping list endpoints |
| `src/app.ts` | Express app setup |
| `src/server.ts` | Server entry point |
| `src/data/recipes.json` | Recipe seed data |
| `package.json` | Dependencies & scripts |
| `tsconfig.json` | TypeScript config |

---

## License

MIT
