import { useEffect } from "react";

export default function SessionRefresher({ onReset }) {
  useEffect(() => {
    onReset();
  }, [onReset]);

  return null; 
}