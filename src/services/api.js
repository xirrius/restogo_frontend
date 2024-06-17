import api from "../config/api";
import {
  p1,
  p2,
  p3,
  p4,
  p5,
  p6,
  p7,
  p8,
  p9,
  p10,
  p11,
  p12,
  p13,
  p14,
  p15,
  p16,
} from "../assets";

const imageMap = {
  1: p1,
  2: p2,
  3: p3,
  4: p4,
  5: p5,
  6: p6,
  7: p7,
  8: p8,
  9: p9,
  10: p10,
  11: p11,
  12: p12,
  13: p13,
  14: p14,
  15: p15,
  16: p16,
};

export const fetchProducts = async () => {
  const response = await api.get("/products/");
  console.log(response);
  const modifiedData = await response.data.map((item) => {
    return {
      ...item,
      image: imageMap[item.id],
    };
  });
  return modifiedData;
  // return response.data;
};

export const fetchProduct = async (productId) => {
  const response = await api.get(`/products/${productId}/`);
   const modifiedData = {
     ...response.data,
     image: imageMap[response.data.id], // Use the image mapping
   };

   return modifiedData;
};

export const fetchOptionListsForProduct = async (productId) => {
  const response = await api.get(`/option-lists/?product=${productId}`);
  console.log(response);
  return response.data;
};

export const fetchOptionsForOptionList = async (optionListId) => {
  const response = await api.get(`/options/?option_list=${optionListId}`);
  console.log(response);
  return response.data;
};

export const fetchCartItems = async () => {
  const response = await api.get(`/cart-items/`);
  console.log(response);
  return response.data;
};

export const fetchCartItem = async (cartItemId) => {
  const response = await api.get(`/cart-items/${cartItemId}/`);
  console.log(response);
  return response.data;
};

export const createCartItem = async (
  productId,
  quantity,
  totalPrice,
  selectedOptions
) => {
  const response = await api.post(`/cart-items/`, {
    cart: 1,
    product: productId,
    quantity,
    price: totalPrice,
    selected_options: selectedOptions,
  });
  console.log(response);
  return response.data;
};

export const updateCartItem = async (cartItemId, updatedData) => {
  const res = await api.put(`/cart-items/${cartItemId}/`, updatedData);
  console.log(res);
  return res.data;
};

export const deleteCartItem = async (cartItemId) => {
  const response = await api.delete(`/cart-items/${cartItemId}/`);
  console.log(response);
  return response.data;
};

export const createOrder = async (cartId, paymentInfo) => {
  const res = await api.post("/orders/", {
    cart: cartId,
    total_price: paymentInfo,
  });
  console.log(res);
  return res.data;
};

export const fetchOrderHistory = async () => {
  const res = await api.get("/orders/");
  console.log(res);
  return res.data;
};
