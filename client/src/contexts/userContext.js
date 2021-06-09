import { createContext, useReducer } from "react";

export const UserContext = createContext();

const initialState = {
  login: localStorage.getItem("token") !== null,
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  showLoginPopup: false,
};
const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "success":
    case "login":
      localStorage.setItem("token", payload.token);
      localStorage.setItem("user", JSON.stringify(payload));
      return {
        ...state,
        login: true,
        user: payload,
      };
    // Login Pop Up
    case "showLoginPopup":
      return {
        ...state,
        showLoginPopup: true,
      };
    case "hideLoginPopup":
      return {
        ...state,
        showLoginPopup: false,
      };
    // After Buy Pop Up
    case "showAfterBuyPopUp":
      return {
        ...state,
        showAfterBuyPopUp: true,
      };
    case "hideAfterBuyPopUp":
      return {
        ...state,
        showAfterBuyPopUp: false,
      };
    // Buy Pop Up
    case "showBuyPopup":
      return {
        ...state,
        showBuyPopup: true,
      };
    case "hideBuyPopup":
      return {
        ...state,
        showBuyPopup: false,
      };
    case "failed":
    case "logout":
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        login: false,
        user: null,
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={[state, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};
