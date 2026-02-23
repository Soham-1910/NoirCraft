import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/CartDrawer";
import "./index.css"

function App() {
  return (
    <Router>
      <Navbar />
      <CartDrawer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/category/:type" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;
