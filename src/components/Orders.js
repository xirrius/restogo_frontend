// src/components/Orders.js

import React, { useEffect, useState } from "react";
import { fetchOrderHistory } from "../services/api";
import { useNavigate } from "react-router-dom";

const convertToIST = (utcDate) => {
  const date = new Date(utcDate);
  const istDate = new Date(date.getTime());
  return istDate.toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
};

const Orders = () => {
  const navigate = useNavigate()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrderHistory();
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        console.error("Error loading orders:", error);
        setError("Failed to load orders. Please try again later.");
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  if (loading)
    return (
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-center text-6xl font-dancing mb-20 font-black">
          Your Order History
        </h1>
        <p className="font-dancing text-2xl text-center font-bold">
          Just a second! We are almost done loading...
        </p>
      </div>
    );
  if (error)
    return (
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-center text-6xl font-dancing mb-20 font-black">
          Your Order History
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

    if(orders.length === 0) return (
      <div className="p-10 flex flex-col items-center">
        <h1 className="text-center text-6xl font-dancing mb-20 font-black">
          My Cart
        </h1>
        <p className="font-dancing text-2xl text-center font-bold">
          Oops! Looks like you haven't made any purchases yet.
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
    <div className="orders-list products-container p-10 flex flex-col items-center justify-center">
      <h1 className="text-center text-6xl font-dancing mb-20 font-black">
        Your Order History
      </h1>
      
        <ul className='flex flex-col-reverse gap-10 w-full'>
          {orders.map((order) => (
            <li key={order.id} className="order-item bg-white shadow-2xl rounded-xl p-4">
              <p className="font-dancing font-black text-2xl my-3">Order ID: {order.id}</p>
              <p className="font-serif font-bold text-lg mb-2">Price: ${order.total_price}</p>
              <p className="font-serif text-lg">Order Placed On {convertToIST(order.created_at)}</p>
            </li>
          ))}
        </ul>
      
      <button onClick={() => navigate(-1)} className="w-full sm:w-96 mt-10 bg-black text-white rounded-[999px] py-2 px-8 transition-all duration-500 hover:scale-105 font-bold text-xl">Go Back</button>
    </div>
  );
};

export default Orders;
