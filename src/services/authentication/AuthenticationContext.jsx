import { useState, createContext } from "react";
import React from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("userData");
const userValue = userValueString ? JSON.parse(userValueString) : null;
const tokenValue = localStorage.getItem("token");

export const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState(tokenValue);  
  const [user, setUser] = useState(userValue);
  const [shopId, setShopId] = useState(null);
  const [dataForRequest, setDataForRequest] = useState({
    shopId: null,
    serviceId: null,
    providerId: null,
    clientId: null,
    dateAndHour: null,
  });
  const dataLoginHandler = (username, role, id, token, email, shopId) => {
    console.log("SHOP ID LOCO; ",shopId)
    localStorage.setItem(
      "userData",
      JSON.stringify({ username, role, id, email,shopId })
    );
    localStorage.setItem("token", token);
    setUser({ username, role, id, email, shopId });
    console.log("user", user);
    setToken(tokenValue ? tokenValue : token);
  };

  const setShopIdHandler = (id) => {
    setShopId(id); //Actualiza el id del shop
  };

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    setShopId(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        token,
        setToken,
        user,
        setUser,
        dataLoginHandler,
        logoutHandler,
        shopId,
        setShopId: setShopIdHandler,
        dataForRequest,
        setDataForRequest,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

AuthenticationContextProvider.propTypes = {
  children: PropType.object,
};
