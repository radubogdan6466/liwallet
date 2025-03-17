// hooks/useLoading.js

import { useState, useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useTheme } from "@mui/material/styles";

function useLoading(initialState = true, delay = 50) {
  const [isLoading, setIsLoading] = useState(initialState);
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    // Cleanup function to clear the timeout when component unmounts
    return () => clearTimeout(timer);
  }, []);

  const LoadingIndicator = () => {
    if (!isLoading) return null;

    return (
      <Backdrop open>
        <CircularProgress color="success" size={150} />
      </Backdrop>
    );
  };

  return [isLoading, setIsLoading, LoadingIndicator];
}

export default useLoading;
