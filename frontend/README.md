# Cooking Assistant Frontend - React + Vite

Production-ready React frontend for the cooking assistant app. Consumes the backend API to match recipes by ingredients.

## Quick Start

### Install dependencies
```bash
npm install
```

### Run development server
```bash
npm run dev
```

Frontend starts on `http://localhost:5173`

### Build for production
```bash
npm run build
npm preview
```

---

## Architecture

### Project Structure
```
src/
├── components/           # Reusable UI components
│   ├── Navigation.tsx    # Top navigation bar
│   ├── IngredientSelector.tsx  # Ingredient selection with search
│   ├── RecipeCard.tsx    # Recipe result card
│   ├── RecipeDetail.tsx  # Recipe full view
│   └── ShoppingList.tsx  # Shopping list with categories
├── pages/               # Page components
│   ├── HomePage.tsx     # Ingredient selection & results
│   ├── RecipeDetailPage.tsx  # Recipe detail view
│   └── ShoppingListPage.tsx  # Shopping list view
├── services/           # API integration
│   └── api.ts         # Axios instances & API calls
├── hooks/             # Custom React hooks & context
│   ├── useShoppingList.ts  # Shopping list logic
│   └── ShoppingContext.tsx # Shopping context provider
├── types/            # TypeScript types
│   └── index.ts      # All interfaces
├── App.tsx           # Main app component
├── App.css           # App-level styles
├── index.css         # Tailwind setup
└── main.tsx          # React entry point
```

### Component Tree
```
App
├── ShoppingProvider
│   ├── Navigation
│   └── Router
│       ├── HomePage
│       │   ├── MealTypeSelector
│       │   └── IngredientSelector
│       │       └── RecipeCard[]
│       ├── RecipeDetailPage
│       │   └── RecipeDetail
│       └── ShoppingListPage
│           └── ShoppingList
```

---

## Pages

### 1. Home Page (`/`)
- **Purpose:** Find recipes by selecting ingredients
- **Components:**
  - Meal type selector (breakfast/lunch/dinner)
  - Ingredient selector with search & categorization
  - "Find Recipes" button
  - Recipe results (sorted by relevance)

**Flow:**
1. Select meal type
2. Search & select ingredients
3. Click "Find Recipes"
4. API calls `POST /recipes/match`
5. Display ranked results with match %, cook time, calories

---

### 2. Recipe Detail Page (`/recipe/:id`)
- **Purpose:** View full recipe and add to shopping list
- **Components:**
  - Recipe title, meal type, cook time
  - Macro breakdown (protein/fat/carbs)
  - Full ingredients list
  - Step-by-step instructions
  - "Add to Shopping List" button

**Flow:**
1. Click recipe card from home
2. Load full recipe via `GET /recipes/:id`
3. Display all details
4. Click "Add to Shopping" → adds all ingredients to client-side shopping list

---

### 3. Shopping List Page (`/shopping`)
- **Purpose:** View & manage shopping list
- **Components:**
  - Items grouped by category
  - Checkbox to mark items as done
  - Delete item button
  - Clear all button
  - Link back to find more recipes

**State:** Client-side context (persists during session)

---

## API Integration

### Service Layer (`src/services/api.ts`)

Uses Axios to call backend API:

```typescript
recipeApi.getAll(mealType?)  // GET /recipes
recipeApi.getById(id)        // GET /recipes/:id
recipeApi.match(request)     // POST /recipes/match
```

### Configuration

Backend URL from `.env`:
```
VITE_API_URL=http://localhost:3000
```

---

## State Management

### Shopping List Context
Global context for shopping list state:
- `items: ShoppingItem[]`
- `addItems(items)`
- `toggleItem(id)`
- `removeItem(id)`
- `clear()`
- `groupByCategory()`

**Located in:** `src/hooks/ShoppingContext.tsx`

All other state is local to components (React hooks).

---

## Component API Reference

### IngredientSelector
```tsx
<IngredientSelector
  availableIngredients={ingredients}
  selected={["eggs", "flour"]}
  onToggle={(name) => { /* ... */ }}
/>
```

### RecipeCard
```tsx
<RecipeCard recipe={recipeMatch} />
// Links to /recipe/:id
```

### RecipeDetail
```tsx
<RecipeDetail recipe={fullRecipe} />
// Shows ingredients, steps, add to shopping button
```

### ShoppingList
```tsx
<ShoppingList />
// Uses global shopping context
// Displays items grouped by category
```

---

## Styling

### Tailwind CSS
All UI styled with Tailwind utility classes. No custom CSS (except Tailwind imports).

### Color Palette
- **Primary:** Blue (actions, highlights)
- **Success:** Green (add to shopping)
- **Warning:** Orange (missing ingredients)
- **Danger:** Red (delete, remove)
- **Neutral:** Gray (text, borders, backgrounds)

### Responsive Design
Mobile-first, constrained to `max-w-md` (cooking app use case - mobile shopping list)

---

## Example Flow

1. **User starts on home page**
   - Sees meal type selector (breakfast/lunch/dinner)
   - Empty ingredient selector

2. **Selects breakfast + ingredients (eggs, flour, butter)**
   - Ingredients display as selected (blue chips)
   - "Find Recipes" button enabled

3. **Clicks "Find Recipes"**
   - Calls `POST /recipes/match` with ingredients
   - Results sorted by:
     - Fewest missing ingredients first
     - Most matches second
     - Fastest cook time third

4. **Sees ranked recipe results**
   - Simple Omelette: 67% match (2/3 ingredients)
   - Pancakes: 60% match (3/5 ingredients)
   - Each shows cook time, calories, macros, missing ingredients

5. **Clicks recipe card**
   - Navigates to `/recipe/recipe-002`
   - Calls `GET /recipes/:id`
   - Shows full recipe: ingredients, steps, macros

6. **Clicks "Add to Shopping"**
   - All recipe ingredients added to shopping list
   - Shopping context updated
   - Toast notification "Added!"

7. **Goes to shopping list**
   - Items grouped by category (Dairy, Eggs, Grains, etc.)
   - Can check/uncheck items
   - Can delete individual items
   - Can clear entire list

---

## Development

### TypeScript
Strict mode enabled. All files typed.

### Project Structure Philosophy
- **Separation of concerns:** API, UI, state separate
- **Reusable components:** RecipeCard, IngredientSelector, etc.
- **Context for shared state:** Shopping list (avoid prop drilling)
- **Local state for UI:** Loading, error, selections

### No Backend Logic
- All business logic in backend (`/recipes/match`)
- Frontend only handles:
  - UI state (selections, loading)
  - Shopping list management (client-side)
  - API integration (axios)

---

## Environment Variables

Create `.env.local`:
```
VITE_API_URL=http://localhost:3000
```

**Default:** `http://localhost:3000` (assumes backend running locally)

---

## Stack Details

- **Framework:** React 18 + Vite
- **Routing:** React Router v6
- **HTTP:** Axios
- **Styling:** Tailwind CSS 3
- **Language:** TypeScript (strict)
- **Node:** 16+

---

## Files Overview

| File | Purpose |
|------|---------|
| `src/App.tsx` | Main app component, router setup |
| `src/main.tsx` | React entry point |
| `src/index.css` | Tailwind imports |
| `src/pages/HomePage.tsx` | Recipe finder logic |
| `src/pages/RecipeDetailPage.tsx` | Recipe detail view |
| `src/pages/ShoppingListPage.tsx` | Shopping list page |
| `src/components/*.tsx` | Reusable UI components |
| `src/services/api.ts` | API service layer |
| `src/hooks/ShoppingContext.tsx` | Global shopping state |
| `src/types/index.ts` | TypeScript interfaces |
| `vite.config.ts` | Vite configuration |
| `tailwind.config.js` | Tailwind configuration |
| `package.json` | Dependencies & scripts |

---

## Known Limitations (MVP)

- Shopping list not persisted (clears on page reload)
- No user preferences/favorites
- No meal planning
- No recipe ratings/reviews
- No dietary filters beyond ingredient matching

---

## Future Enhancements

1. **Persistent Storage:** LocalStorage or backend for shopping list
2. **User Accounts:** Save favorite recipes, past shopping lists
3. **Meal Planning:** Multi-day meal plans
4. **Dietary Filters:** Allergies, dietary restrictions
5. **Offline Support:** Service workers for offline browsing
6. **PWA:** Install as app on phone

---

## License

MIT
