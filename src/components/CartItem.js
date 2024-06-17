import { useNavigate, useParams } from "react-router-dom"
import {useCart} from "../CartContext"
import {fetchOptionListsForProduct, fetchOptionsForOptionList} from "../services/api"
import { useEffect, useState } from "react"
import {toast} from "react-hot-toast"

const CartItem =  () => {
  const {id} = useParams()
  const { updateCartItemInContext, removeFromCart, cartItems } = useCart();
  const navigate = useNavigate()
  const cartItem = cartItems.find((item) => item.id === parseInt(id));
  
  const [optionLists, setOptionLists] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  

  useEffect(() => {
    if(!cartItem) return

    console.log("CartItem:", cartItem);
    setTotalPrice(cartItem?.price)
    setQuantity(cartItem?.quantity)

    const loadOptions = async () => {
      try {
        const optionListsData = await fetchOptionListsForProduct(cartItem.product.id)
        const listsWithOptions = await Promise.all(
          optionListsData.map(async (list) => {
            const optionsRes = await fetchOptionsForOptionList(list.id);
            return {...list, options: optionsRes}
          })
        )
        setOptionLists(listsWithOptions);

        const initialSelectedOptions = {};
        listsWithOptions.forEach((list) => {
          if (list.selection_type === "must_select_one") {
            initialSelectedOptions[list.id] = cartItem.selected_options.find(
              (optId) => list.options.some((option) => option.id === optId)
            );
          } else {
            initialSelectedOptions[list.id] = cartItem.selected_options.filter(
              (optId) => list.options.some((option) => option.id === optId)
            );
          }
        });
        setSelectedOptions(initialSelectedOptions);

        setLoading(false)
      } catch (error) {
        console.error("Error loading cart item details:", error);
        setError("Failed to load cart item details. Please try again later.");
        setLoading(false);
      }
    }
    loadOptions();
  }, [cartItem, id])

  const calculateTotalPrice = (
    basePrice,
    selectedOptions,
    optionLists,
    quantity
  ) => {
    let total = parseFloat(basePrice) || 0;
    for (const listId in selectedOptions) {
      const list = optionLists.find((list) => list.id === parseInt(listId));
      const selectedOptionIds = selectedOptions[listId];
      if (Array.isArray(selectedOptionIds)) {
        // eslint-disable-next-line no-loop-func
        selectedOptionIds.forEach((optionId) => {
          const option = list?.options.find((opt) => opt.id === optionId);
          if (option && option.surcharge) {
            total += parseFloat(option.surcharge);
          }
        });
      } else {
        const option = list?.options.find(
          (opt) => opt.id === selectedOptionIds
        );
        if (option && option.surcharge) {
          total += parseFloat(option.surcharge);
        }
      }
    }
    return total * quantity;
  };

  const handleOptionChange = (listId, optionId) => {
    setSelectedOptions((prev) => {
      const list = optionLists.find((list) => list.id === listId);
      if (list.selection_type === "must_select_one") {
        const newSelectedOptions = { ...prev, [listId]: optionId };
        setTotalPrice(
          calculateTotalPrice(
            cartItem.product.price,
            newSelectedOptions,
            optionLists,
            quantity
          )
        );
        return newSelectedOptions;
      } else {
        const currentOptions = prev[listId] || [];
        const updatedOptions = currentOptions.includes(optionId)
          ? currentOptions.filter((id) => id !== optionId)
          : [...currentOptions, optionId];
        const newSelectedOptions = { ...prev, [listId]: updatedOptions };
        setTotalPrice(
          calculateTotalPrice(
            cartItem.product.price,
            newSelectedOptions,
            optionLists,
            quantity
          )
        );
        return newSelectedOptions;
      }
    });
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
    setTotalPrice(
      calculateTotalPrice(
        cartItem.product.price,
        selectedOptions,
        optionLists,
        newQuantity
      )
    );
  };

  const handleUpdate = async () => {
    const transformedOptions = Object.entries(selectedOptions).reduce(
      (acc, [listId, optionIds]) => {
        if (Array.isArray(optionIds)) {
          // If the value is an array, concatenate it to the accumulator array
          return acc.concat(optionIds);
        } else {
          // If the value is a single optionId, push it to the accumulator array
          acc.push(optionIds);
          return acc;
        }
      },
      []
    );
    const updatedData = {
      ...cartItem,
      product: cartItem.product.id,
      quantity,
      selected_options: transformedOptions,
      price: totalPrice,
    };
    console.log("Updated Data:", updatedData);
    try {
    await updateCartItemInContext(cartItem.id, updatedData);
    toast.success('Cart Item updated!')
  } catch (error) {
    console.error("Error updating cart item:", error);
    toast.error("Error updating cart item.");
  }
  };

  const handleRemove = async (itemId) => {
    await removeFromCart(itemId);
    toast.error('Cart Item removed.')
    navigate(-1)
  };

  if (loading) return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-center text-6xl font-dancing mb-20 font-black">
        Cart Item
      </h1>
      <p className="font-dancing text-2xl text-center font-bold">
        Just a second! We are almost done loading...
      </p>
    </div>
  );
  if (error || !cartItem) return (
    <div className="p-10 flex flex-col items-center">
      <h1 className="text-center text-6xl font-dancing mb-20 font-black">
        Product
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
  
  return (
    <div className="products-container p-10">
      <h1 className="text-center text-4xl sm:text-6xl font-dancing mb-16 font-black">
        {cartItem.product.name}
      </h1>
      <div className="flex sm:flex-row flex-col gap-10 sm:gap-20">
        <div className="flex-1">
          <img
            src={cartItem.product.image}
            alt={cartItem.product.name}
            className="rounded-3xl shadow-2xl w-full h-2/3"
          />
          <p className="font-dancing text-xl sm:text-3xl font-bold mt-6 mb-4">
            "{cartItem.product.description}"
          </p>
          <p className="font-serif text-2xl mb-4">
            Price: ${cartItem.product.price}
          </p>
        </div>
        <div className="flex-[0.75] bg-white shadow-2xl rounded-2xl p-8 flex flex-col">
          {optionLists.map((list) => (
            <div key={list.id} className="option-list mt-5">
              <h3 className="font-dancing text-center text-3xl font-bold my-4">
                ~ {list.name} ~
              </h3>
              {list.options.map((option) => (
                <label key={option.id} className="flex gap-3 mb-4 font-serif">
                  <input
                    type={
                      list.selection_type === "must_select_one"
                        ? "radio"
                        : "checkbox"
                    }
                    name={`option-list-${list.id}`}
                    value={option.id}
                    checked={
                      list.selection_type === "must_select_one"
                        ? selectedOptions[list.id] === option.id
                        : selectedOptions[list.id]?.includes(option.id)
                    }
                    onChange={() => handleOptionChange(list.id, option.id)}
                  />
                  {option.name}{" "}
                  {option.surcharge > 0 && `(+$${option.surcharge})`}
                </label>
              ))}
            </div>
          ))}
          <div className="quantity-selector mt-8 sm:mt-16 flex gap-10 items-center justify-center">
            <button
              onClick={() => handleQuantityChange(Math.max(1, quantity - 1))}
              className="bg-highlight rounded-xl px-5 py-2 text-white font-black text-xl hover:scale-105 transition-all duration-500"
            >
              -
            </button>
            <span className="font-serif text-4xl">{quantity}</span>
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="bg-highlight rounded-xl px-5 py-2 text-white font-black text-xl hover:scale-105 transition-all duration-500"
            >
              +
            </button>
          </div>
          <p className="text-center font-serif font-bold text-xl my-6">
            Total Price: ${totalPrice.toFixed(2)}
          </p>
          <button
            onClick={() => handleUpdate()}
            className="w-full bg-highlight rounded-[999px] hover:scale-105 transition-all duration-500 text-white font-bold py-2 text-lg mt-5"
          >
            Update Cart Item
          </button>
          <button
            onClick={() => handleRemove(cartItem.id)}
            className="w-full bg-black rounded-[999px] hover:scale-105 transition-all duration-500 text-white font-bold py-2 text-lg mt-5"
          >
            Remove From Cart
          </button>
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-indigo-800 rounded-[999px] hover:scale-105 transition-all duration-500 text-white font-bold py-2 text-lg mt-5"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
export default CartItem