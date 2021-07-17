import { useState } from "react";

export default function useInput({ placeholder = "", type = "text" }) {
  const [value, setValue] = useState("");

  const getValue = () => {
    return value;
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const clear = () => {
    setValue("");
  };

  return {
    tagAttrs: {
      value,
      type,
      placeholder,
      onChange,
    },
    getValue,
    clear,
  };
}
