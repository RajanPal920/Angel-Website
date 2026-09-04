import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import FloatingButtons from "./components/FloatingButtons";
import Certificates from "./pages/Certificates";
import ProductsCategory from "./pages/ProductsCategory";
import MaterialDetail from "./pages/MaterialDetail";
import Dimensions from "./pages/Dimensions";
import MDetail from "./pages/MDetail";
import Materials from "./pages/Materials";

function App() {
  return (
    <Router>
      <TopBar />
      <Header />
      <main>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* About */}
          <Route path="/about" element={<About />} />

          {/* Materials */}
          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/:slug" element={<MDetail />} />

          {/* Products */}
          <Route path="/products" element={<Products />} />

          {/* Products Category - Shows products in a specific category */}
          <Route path="/products/:slug" element={<ProductsCategory />} />

          {/* Product Detail - Shows details of a specific product */}
          <Route
            path="/products/:slug/:materialSlug"
            element={<MaterialDetail />}
          />

          {/* Certificates */}
          <Route path="/certificates" element={<Certificates />} />

          {/* Dimensions */}
          <Route path="/dimensions" element={<Dimensions />} />

          {/* Contact */}
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </Router>
  );
}

export default App;
