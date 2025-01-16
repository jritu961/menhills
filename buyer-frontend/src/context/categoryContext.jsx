import React, { createContext, useState, useContext } from 'react';

export const MyContext = createContext();

export const MyProvider = ({ children }) => {
  const [category, setCategory] = useState('');
  const [address, setAddress] = useState(''); 

  return (
    <MyContext.Provider value={{ category, setCategory, address, setAddress }}>
      {children}
    </MyContext.Provider>
  );
};

// Custom hook to use the context
export const useMyContext = () => {
  return useContext(MyContext);
};
