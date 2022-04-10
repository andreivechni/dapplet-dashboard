import React, { ReactNode } from "react";
import Cross from "../../assets/img/Dapplet/cross.svg";
import css from "./Tag.module.scss";

type TagProps = {
  children: ReactNode;
};

const Tag = ({ children }: TagProps) => {
  return (
    <div className={css.root}>
      <div>{children}</div>
      <Cross />
    </div>
  );
};

export default Tag;
