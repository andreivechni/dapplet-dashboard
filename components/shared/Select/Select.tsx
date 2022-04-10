import React, { ReactNode, useCallback } from "react";
import css from "./Select.module.scss";

type SelectProps = {
  value: string;
  name: string;
  children: ReactNode;
  onChange: React.Dispatch<React.SetStateAction<string>>;
};

const Select = ({ value, onChange, children }: SelectProps) => {
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value);
    },
    []
  );

  return (
    <select
      className={css.select}
      value={value}
      onChange={(e) => handleChange(e)}
    >
      {children}
    </select>
  );
};

export default Select;
