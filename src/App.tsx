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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductsCategory />} />
          <Route
            path="/products/:slug/:materialSlug"
            element={<MaterialDetail />}
          />
          <Route path="/materials" element={<Materials />} />
          <Route path="/materials/:slug" element={<MDetail />} />
           <Route path="/products/:slug/:materialSlug" element={<MaterialDetail />} />
          <Route path="/certificates" element={<Certificates />} />
          <Route path="/dimensions" element={<Dimensions />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
      <FloatingButtons />
    </Router>
  );
}

export default App;
