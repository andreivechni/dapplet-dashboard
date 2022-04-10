import React, { useCallback, useState } from "react";
import Logo from "../../assets/img/Logo.svg";
import Menu from "../../assets/img/Menu.svg";
import css from "./Header.module.scss";

type HeaderProps = {
  onNavActivation: () => void;
};

const Header = ({ onNavActivation }: HeaderProps) => {

  return (
    <header className={css.root}>
      <div className={css.title}>
        <div className={css.logo}>
          <Logo></Logo>
        </div>
        Dapplets Project<span className={css.titleDot}>.</span>
      </div>
      <div className={css.menu}>
        <Menu onClick={onNavActivation}></Menu>
      </div>
    </header>
  );
};

export default Header;
