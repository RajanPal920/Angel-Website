import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

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
      <ScrollToTop />
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

          {/* All Products */}
          <Route path="/products" element={<Products />} />

          {/* Combined Product Categories with nested forward-slash slugs */}
          <Route
            path="/products/circles/rings"
            element={<ProductsCategory />}
          />
          <Route
            path="/products/circles/rings/:materialSlug"
            element={<MaterialDetail />}
          />

          <Route
            path="/products/sheets/plate/coil"
            element={<ProductsCategory />}
          />
          <Route
            path="/products/sheets/plate/coil/:materialSlug"
            element={<MaterialDetail />}
          />

          <Route
            path="/products/flanges/forged-fittings"
            element={<ProductsCategory />}
          />
          <Route
            path="/products/flanges/forged-fittings/:materialSlug"
            element={<MaterialDetail />}
          />

          <Route
            path="/products/angle-chennels/flat"
            element={<ProductsCategory />}
          />
          <Route
            path="/products/angle-chennels/flat/:materialSlug"
            element={<MaterialDetail />}
          />
          <Route
            path="/products/angle-channels/flat"
            element={<ProductsCategory />}
          />
          <Route
            path="/products/angle-channels/flat/:materialSlug"
            element={<MaterialDetail />}
          />
          <Route
            path="/products/angle-channels/flat-plate"
            element={<ProductsCategory />}
          />
          <Route
            path="/products/angle-channels/flat-plate/:materialSlug"
            element={<MaterialDetail />}
          />

          {/* Products Category - Single-segment categories */}
          <Route path="/products/:slug" element={<ProductsCategory />} />

          {/* Product Detail - Single-segment category product details */}
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
