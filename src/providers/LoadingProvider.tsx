import React, { useState, ReactNode } from "react";
import { LoadingContext } from "../contexts/LoadingContext";

interface LoadingProviderProps {
  children: ReactNode;
}

const LoadingProvider: React.FC<LoadingProviderProps> = ({ children }) => {
  const [loading, setLoading] = useState({
    state: false,
    content: <h3>Ładowanie...</h3>,
  });

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
