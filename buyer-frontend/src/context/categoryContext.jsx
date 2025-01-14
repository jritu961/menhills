// Context.js
import React, { createContext, useState, useContext } from 'react';
export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [category, setcategory] = useState('');

  return (
    <MyContext.Provider value={{ category, setcategory }}>
      {children}
    </MyContext.Provider>
  );
};

export const useMyContext = () => {
  return useContext(MyContext);
};
