// Products.js
import React, { useState, useEffect } from "react";
import { fetchProducts } from "../services/api";
import { useNavigate} from "react-router-dom"

const categories = ["All", "Pizza", "Burger", "Pasta", "Salad"];

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    fetchProducts()
      .then((response) => {
        if(selectedCategory !== 'All') {
          setProducts(response.filter(product => product.category === selectedCategory))
        }
        else setProducts(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, [selectedCategory]);

  const handleAddToCart = async (product) => {
    navigate(`/product/${product}`)
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log(category);
  }

  if (loading) {
    return (
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-center text-6xl font-dancing mb-20 font-black">
          Our Products
        </h1>
        <p className="font-dancing text-2xl text-center font-bold">
          Just a second! We are almost done loading...
        </p>
      </div>
    );
  }

  if (error || !products) {
    return (
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-center text-6xl font-dancing mb-20 font-black">
          Our Products
        </h1>
        <p className="font-dancing text-2xl text-center font-bold">
          Sorry! We couldn't find what you were looking for...
        </p>
        <button
          className="bg-black rounded-[999px] hover:scale-105 transition-all duration-500 text-white font-bold px-20 py-2  mt-12"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="products-container p-10">
      <h1 className="text-center text-6xl font-dancing mb-16 font-black">
        Our Products
      </h1>
      <div className="flex mb-10 gap-6 justify-center flex-wrap">
        {categories.map((category) => (
        <p
          className={`${(selectedCategory === category)? "text-white bg-highlight": "bg-white hover:bg-highlight hover:text-white"} cursor-pointer shadow-lg rounded-xl py-1 px-4 font-serif transition-all duration-200 hover:scale-105`}
          onClick={() => handleCategoryChange(category)}
          value="All"
        >
          {category}
        </p>
        ))}
      </div>
      <div className="products-grid flex flex-wrap backdrop:blur-xl gap-8 sm:gap-16 md:gap-24 justify-center ">
        {products.map((product) => (
          <div
            key={product.id}
            className="product-card bg-white rounded-xl p-4 px-6 flex flex-col items-center w-full sm:w-80 justify-between shadow-xl backdrop:blur-xl"
          >
            <div className="flex flex-col items-center">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-full w-60 h-60 mb-4 shadow-2xl"
              />
              <h3 className="font-serif text-lg font-bold text-center">
                {product.name}
              </h3>
              <p className="font-dancing font-bold  text-center mt-2 mb-4">
                "{product.description}"
              </p>
              <p className="font-serif">Price: ${product.price}</p>
            </div>
            <button
              onClick={() => handleAddToCart(product.id)}
              className="bg-highlight py-2 px-4 rounded-[999px] text-white mt-3 font-bold hover:scale-105 transition-all duration-500 w-full mb-2"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
