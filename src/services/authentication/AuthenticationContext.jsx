import { useState, createContext } from "react";
import React from "react";
import PropType from "prop-types";

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("userData");
const userValue = userValueString ? JSON.parse(userValueString) : null;

export const AuthenticationContextProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(userValue);
  const [shopId, setShopId] = useState(null);

  const [dataForRequest, setDataForRequest] = useState({
    shopId: null,
    serviceId: null,
    providerId: null,
    clientId: null,
    dateAndHour: null,
  });

  const dataLoginHandler = (username, role, id, token) => {
    localStorage.setItem("userData", JSON.stringify({ username, role, id }));
    setUser({ username, role, id });
    setToken(token);
    console.log(token);
    // console.log(user);
  };

  const setShopIdHandler = (id) => {
    setShopId(id); //Actualiza el id del shop
  };

  const logoutHandler = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setToken("");
    setShopId(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        token,
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
