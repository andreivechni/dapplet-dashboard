import React from "react";
import { motion } from "framer-motion";
import Dapplets from "../../assets/img/Nav/dapplets.svg";
import Heart from "../../assets/img/Nav/heart.svg";
import Grid from "../../assets/img/Nav/grid.svg";
import Users from "../../assets/img/Nav/users.svg";
import TrendingUp from "../../assets/img/Nav/trending-up.svg";
import { AnimatePresence } from "framer-motion";
import cn from "classnames";
import css from "./Nav.module.scss";
import { MOBILE_SCREEN_SIZE } from "../../constatns";
import useWindowDimensions from "../../hooks/useWindowDemensions";

type NavProps = {
  isOpen: boolean;
  setIsOpen: () => void;
};

const Nav = ({ isOpen, setIsOpen }: NavProps) => {
  const { width } = useWindowDimensions();
  const isDesktop = width ? width > MOBILE_SCREEN_SIZE : false;

  const direction = isDesktop ? "-100%" : "100%";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={css.root}
          initial={{ x: direction }}
          animate={{
            x: 0,
          }}
          exit={{
            x: direction,
          }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
        >
          {isDesktop && <button onClick={setIsOpen}>toggle</button>}
          <div
            className={cn(css.item, {
              [css.active]: true,
            })}
          >
            <Dapplets />
            <div>All Dapplets</div>
          </div>
          <div className={css.item}>
            <Heart />
            <div>Editor’s Choice</div>
          </div>
          <div className={css.item}>
            <Grid />
            <div>Essential Dapplets</div>
          </div>
          <div className={css.item}>
            <Users />
            <div>Social Networks</div>
          </div>
          <div className={css.item}>
            <TrendingUp />
            <div>Financial Dapplets</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Nav;
