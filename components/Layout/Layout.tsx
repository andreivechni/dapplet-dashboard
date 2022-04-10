import React, { ReactNode, useState } from "react";

import css from "./Layout.module.scss";

type LayoutProps = {
  children: ReactNode;
};

/* Utilized layout pattern for possible scaling */

const Layout = ({ children }: LayoutProps) => {


  return (
    <div className={css.root}>
      
      <main>{children}</main>
    </div>
  );
};

export default Layout;
