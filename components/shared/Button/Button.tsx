import React, { ReactNode } from "react";
import css from "./Button.module.scss";
import cn from "classnames";

type ButtonProps = {
  children: ReactNode;
  transparent?: boolean;
  size?: string;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const Button = ({ children, transparent, size, className, ...rest }: ButtonProps) => {
  const _class = cn(className, css.root, {
    [css.transparent]: transparent,
    [css.xs]: size,
  });
  return <button {...rest} className={_class}>{children}</button>;
};

export default Button;
