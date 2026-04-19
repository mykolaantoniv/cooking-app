import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShoppingProvider } from "./hooks/ShoppingContext";
import { Navigation } from "./components/Navigation";
import { BottomNav } from "./components/BottomNav";
import { HomePage } from "./pages/HomePage";
import { RecipeDetailPage } from "./pages/RecipeDetailPage";
import { ShoppingListPage } from "./pages/ShoppingListPage";
import "./App.css";

function App() {
  return (
    <ShoppingProvider>
      <BrowserRouter>
        <Navigation />
        <main className="max-w-lg mx-auto px-4 py-6 safe-bottom">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/shopping" element={<ShoppingListPage />} />
            <Route path="*" element={<div className="text-center py-12 text-muted-foreground">Page not found</div>} />
          </Routes>
        </main>
        <BottomNav />
      </BrowserRouter>
    </ShoppingProvider>
  );
}

export default App;
