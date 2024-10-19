import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const usePreviousPath = () => {
  const location = useLocation();
  const previousPathRef = useRef(null);

  useEffect(() => {
    previousPathRef.current = location.pathname;
  }, [location]);

  return previousPathRef.current;
};

export default usePreviousPath;
