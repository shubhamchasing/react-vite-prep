import { useEffect, useRef } from "react";

export default function usePrevious(value) {
  const count = useRef();

  useEffect(() => {
    count.current = value;
  }, [value]);

  return count.current;
}
