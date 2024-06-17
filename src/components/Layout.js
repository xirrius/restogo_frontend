// Layout.js

import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
// import logo from "./logo.png"

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const toggleMenu = () => {
    if (isOpen) {
      // If closing the menu, trigger the slide-up animation
      setIsAnimating(true);
      setTimeout(() => {
        setIsOpen(false);
        setIsAnimating(false);
      }, 300); // Match the duration of slideUp animation
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <nav className={`sm:flex hidden pt-2.5 pb-3.5 md:px-12 px-3 justify-between items-center backdrop-blur-lg sticky top-0 z-10 text-primary`}>
        <div className="flex items-center cursor-pointer">
          <img src='./logo.png' alt="logo" className="w-16 " />
          <p className="font-archivo text-2xl">
            <i>RestoGo</i>
          </p>
        </div>
        <ul className="flex justify-around">
          <li className="mx-5 hover:scale-105 transition-all duration-200">
            <NavLink
             exact
              to="/"
              className="font-bold hover:text-highlight transition-all duration-200"
            >
              Home
            </NavLink>
          </li>
          <li className="mx-5 hover:scale-105 transition-all duration-200">
            <NavLink
              to="/products"
              className="font-bold hover:text-highlight transition-all duration-200"
            >
              Products
            </NavLink>
          </li>
          <li className="mx-5 hover:scale-105 transition-all duration-200">
            <NavLink
              to="/history"
              className="font-bold hover:text-highlight transition-all duration-200"
            >
              History
            </NavLink>
          </li>
          <li className="mx-5 hover:scale-105 transition-all duration-200">
            <NavLink
              to="/about"
              className="font-bold hover:text-highlight transition-all duration-200"
            >
              About Us
            </NavLink>
          </li>
        </ul>
        <button
          type="button"
          className="bg-highlight font-bold text-white rounded-full px-5 h-[40px] hover:scale-105 transition-all duration-500 "
        >
          <Link to="/my-cart">
            <div className="flex gap-2 items-center">
              My Cart
              <i className="fa-solid fa-cart-shopping"></i>
            </div>
          </Link>
        </button>
      </nav>

      <nav className="sm:hidden flex flex-col sticky top-0 z-10">
        <div className="flex justify-between py-4 px-6 backdrop-blur-custom">
          <div className="flex items-center cursor-pointer">
            <img src='./logo.png' alt="logo" className="w-16 " />
            <p className="font-archivo text-2xl">
              <i>RestoGo</i>
            </p>
          </div>
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-black animate-lg make-animate"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        <div
          className={`${
            isOpen ? "absolute" : "hidden"
          } flex flex-col border-t-[0.1px] px-8 pt-2 pb-10 top-full left-0 right-0 backdrop-blur-custom
          shadow-lg
          ${isAnimating ? "slide-up" : "slide-down"}`}
        >
          <ul className="mt-3 mb-4">
            <li className="py-4 ">
              <NavLink
                to="/"
                className="font-bold hover:text-highlight transition-all duration-200"
              >
                Home
              </NavLink>
            </li>
            <li className="py-4 ">
              <NavLink
                to="/products"
                className="font-bold hover:text-highlight transition-all duration-200"
              >
                Products
              </NavLink>
            </li>
            <li className="py-4 ">
              <NavLink
                to="/history"
                className="font-bold hover:text-highlight transition-all duration-200"
              >
                History
              </NavLink>
            </li>
            <li className="py-4 ">
              <NavLink
                to="/about"
                className="font-bold hover:text-highlight transition-all duration-200"
              >
                About Us
              </NavLink>
            </li>
          </ul>
          <button
            type="button"
            className="bg-highlight font-bold text-white rounded-full px-5 h-[40px] hover:scale-105 transition-all duration-500 mt-3"
          >
            <Link to="/my-cart">
              <div className="flex gap-2 items-center justify-center">
                My Cart
                <i className="fa-solid fa-cart-shopping"></i>
              </div>
            </Link>
          </button>
        </div>
      </nav>

      <div>{children}</div>
    </>
  );
};

export default Layout;
