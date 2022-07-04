import { faker } from "@faker-js/faker";

const fakerProducts = [...Array(20)].map(() => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  image: faker.image.technics(),
  inStock: faker.helpers.arrayElements([0, 3, 5, 6, 7]),
  fastDelivery: faker.datatype.boolean(),
  ratings: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
}));

export const initialState = {
  products: localStorage.getItem("products")
    ? JSON.parse(localStorage.getItem("products"))
    : fakerProducts,
  cart: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      //? ovaj nacin destrukturira objekat da bi umetnuo jos i qty attribut
      return { ...state, cart: [...state.cart, { ...action.payload, qty: 1 }] };

    // return { ...state, cart: [action.payload, ...state.cart] };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (product) => product.id !== action.payload //po izabranom proizvodu brisanje
        ),
      };

    case "CHANGE_CART_QTY":
      return {
        ...state,
        cart: state.cart.filter((product) =>
          product.id === action.payload.id
            ? (product.qty = action.payload.qty)
            : product.qty
        ),
      };

    //todo Ovo se kasnije moze iskoristiti za npr. add to wishlist i slicno
    // case "MARK_AS_WATCHED":
    //   return {
    //     ...state,
    //     watched: [action.payload, ...state.watched],
    //     watchlist: state.watchlist.filter(
    //       (movie) => movie.id !== action.payload.id //automatsko brisanje po njegovom id-u
    //     ),
    //   };
    // case "REMOVE_FROM_WATCHED_LIST":
    //   return {
    //     ...state,
    //     watched: state.watched.filter((movie) => movie.id !== action.payload),
    //   };
    // case "MOVE_TO_WATCHLIST":
    //   return {
    //     ...state,
    //     watched: state.watched.filter(
    //       (movie) => movie.id !== action.payload.id
    //     ),
    //     watchlist: [action.payload, ...state.watchlist],
    //   };
    default:
      return state;
  }
};
