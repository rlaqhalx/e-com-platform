import { createContext, useReducer } from "react";
import {createAction} from '../utils/reducer/reducer.utils'

// Must return new object for React to re-render

const addCartItem = (cartItems, productToAdd) => {
    // find if cartItems contains productToAdd
    const existingCartItem = cartItems.find((cartItem)=> cartItem.id === productToAdd.id);

    // if found, increament quanity
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ?
        {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }

    // return new array with modified cartItems/ new cart item

    return [...cartItems, {...productToAdd, quantity: 1}];
};

// 3) In order to make removeItemFromCart Function to be used thoughout the code
// we need to create helper function called removeCartItem

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find((cartItem)=> cartItem.id === cartItemToRemove.id);

  // check if quntitiy is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) => cartItem.id === cartItemToRemove.id ?
        {...cartItem, quantity: cartItem.quantity - 1} : cartItem);
}

const clearCartItem = (cartItems, cartItemsToClear) => {
  return cartItems.filter((cartItems) => cartItems.id !== cartItemsToClear.id)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems:[],
  addItemToCart: () => {},
  // 1) let's create removeItemFromCart
  removeItemFromCart: () => {},
  cartCount: 0,
  clearItemFromCart: () => {},
  cartTotal: 0,
});

// 1R) create Initial State (readable) based on CartContext
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
}

const CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
};


// 2R) crate cartReducer with (state, action) where action = {type, payload}
const cartReducer = (state, action) => {
  const {type, payload} = action;
  // const payload = {
  //   cartItems, 
  //   cartCount,
  //   cartTotal
  // }

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state, 
        ...payload
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type of ${type} in cartReducer`)
  }
}

export const CartProvider = ({ children }) => {

  // 3R) Utilize useReducer with cartReducer and INITAL_STATE for dispatch
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  const {cartItems, isCartOpen, cartCount, cartTotal} = state;

  // 4R) create helper function for Reducer for final action
  const updateCartItemsReducer = (newCartItems) => {
    /*
    generate newCart Total & newCartCount
    dispatch new actio nwith payload = {
      newCartItems,
      newCartTotal,
      newCartCount
    }
    */
    const newCartCount =  newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
    const newCartTotal =  newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
    //dispatch({type: CART_ACTION_TYPES.SET_CART_ITEMS, payloads: { cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}});
    dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {cartItems: newCartItems, cartTotal: newCartTotal, cartCount: newCartCount}))
  }

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  }

  // 2) let's create removeItemFromCart function ... to do so we need to create removeCartItem
  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear)
    updateCartItemsReducer(newCartItems);
  }

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool))
  }

  // 4) add removeItemFromCart to value so it can be accessed from other places through provider
  const value = { isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount, removeItemFromCart, clearItemFromCart, cartTotal };
  return <CartContext.Provider value = {value}>{children}</CartContext.Provider>;
};

/*
product {
    id,
    name,
    price,
    imageUrl
}

Cart Item {
    id,
    name,
    price,
    imageUrl,
    quantity
}

*/