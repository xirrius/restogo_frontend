// import React, { useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Cart = () => {
  const { cartItems, totalPrice, removeFromCart, placeOrder } = useCart();
  const navigate = useNavigate();

  const handleRemove = (itemId) => {
    removeFromCart(itemId);
    toast.error('Cart Item removed.')
  };

  const handleUpdate = async (itemId) => {
    navigate(`/my-cart/${itemId}`);
  };

  const handlePlaceOrder = async () => {
    await placeOrder(1, totalPrice);
    toast.success("Order placed successfully!");
    navigate(-1);
  };

  console.log(cartItems);

  if (cartItems.length === 0)
    return (
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-center text-6xl font-dancing mb-20 font-black">
          My Cart
        </h1>
        <p className="font-dancing text-2xl text-center font-bold">
          Oops! Looks like your cart is empty.
        </p>
        <button
          className="bg-black rounded-[999px] hover:scale-105 transition-all duration-500 text-white font-bold px-20 py-2  mt-12"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    );

  return (
    <div className="products-container p-10">
      <h1 className="text-center text-6xl font-dancing mb-20 font-black">
        My Cart
      </h1>
      <div className="flex justify-center items-center mb-10 gap-8 sm:gap-24 sm:flex-row flex-col">
        <h2 className="text-center font-serif text-2xl">
          Total Price: ${totalPrice}
        </h2>
        <button
          onClick={handlePlaceOrder}
          className="bg-highlight rounded-[999px] hover:scale-105 transition-all duration-500 text-white font-bold py-2 px-16 sm:px-8"
        >
          Place Order
        </button>
      </div>
      <ul className="flex flex-wrap backdrop:blur-xl gap-8 sm:gap-16 md:gap-24 justify-center">
        {cartItems.map((item) => (
          <li
            key={item.id}
            className="cart-item bg-white rounded-xl p-4 px-6 flex flex-col items-center w-96 justify-between shadow-xl backdrop:blur-xl"
          >
            <div className="flex flex-col items-center">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="rounded-full w-80 h-80 mb-5 shadow-2xl"
              />
              <h2 className="font-serif text-xl font-bold text-center">
                {item.product.name}
              </h2>
              <p className="font-serif text-lg">Price: ${item.price}</p>
              <p className="font-serif text-lg">Quantity: {item.quantity}</p>
              <button
                onClick={() => handleUpdate(item.id)}
                className="w-full bg-highlight rounded-[999px] hover:scale-105 transition-all duration-500 text-white font-bold py-2 mt-6"
              >
                Update
              </button>
              <button
                onClick={() => handleRemove(item.id)}
                className="w-full bg-black rounded-[999px] hover:scale-105 transition-all duration-500 text-white font-bold py-2  mt-3"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
