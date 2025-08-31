import Orders from "./routes/Orders.jsx";
import Success from "./routes/Success.jsx";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer.jsx";
import Home from "./routes/Home";
import Catalog from "./routes/Catalog";
import ProductDetail from "./routes/ProductDetail.jsx";
import Cart from "./routes/Cart.jsx";
import Login from "./routes/Login.jsx";
import Register from "./routes/Register.jsx";
import Profile from "./routes/Profile.jsx";

function NotFound(){ return <div className="container py-8"><h1 className="text-2xl font-bold">Página no encontrada</h1>  
      <Footer />
  </div>; }

export default function App(){
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/catalog" element={<Catalog/>} />
        <Route path="/product/:id" element={<ProductDetail/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<Register/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/success" element={<Success/>} />
        <Route path="*" element={<NotFound/>} />
        <Route path="/product/:pid" element={<ProductDetail/>} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
    </>
  );
}
