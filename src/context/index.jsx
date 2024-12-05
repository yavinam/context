import { useContext, createContext, useState } from "react";
const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  return (
    <Context.Provider value={{ user, setUser }}>{children}</Context.Provider>
  );
};

export const useStateValue = () => useContext(Context);
