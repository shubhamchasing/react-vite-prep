import { useEffect, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);

      return () => clearTimeout(timer);
    }, delay);
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;