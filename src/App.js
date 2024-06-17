import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Products from "./components/Products";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Cart from "./components/Cart"
import Orders from "./components/Orders"
import ProductDetail from "./components/ProductDetail"
import CartItem from "./components/CartItem";
import About from "./components/About";

const App = () => {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/my-cart" element={<Cart />} />
            <Route path="/history" element={<Orders />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/my-cart/:id" element={<CartItem />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
