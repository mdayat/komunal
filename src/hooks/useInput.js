import { useState } from "react";

function useInput(initialValue) {
  const [input, setInput] = useState(initialValue);
  function changeInput(event) {
    setInput(event.target.value);
  }
  return [input, changeInput];
}

export { useInput };
