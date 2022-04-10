import React, { useCallback, useState } from "react";
import { Dapplet, Tag as TagType } from "../../types";
import { API_BASE_URL, DESKTOP_SCREEN_SIZE, MOBILE_SCREEN_SIZE } from "../../constatns";
import Button from "../shared/Button/Button";
import Tag from "./Tag";
import Install from "../../assets/img/Dapplet/install.svg";
import Installed from "../../assets/img/Dapplet/installed.svg";
import useWindowDimensions from "../../hooks/useWindowDemensions";
import css from "./Dapplet.module.scss";
import useFetch from "../../hooks/useFetch";
import { motion, AnimatePresence } from "framer-motion";
import cn from "classnames";
import FallbackedImage from "../shared/FallbackedImage";

const FALLBACK_LOGO = "/logo.png";

type DappletProps = {
  dapplet: Dapplet;
};

const Dapplet = ({ dapplet }: DappletProps) => {
  const [expanded, setExpanded] = useState(false);
  const [isInstalled, setIsInstalled] = useState(
    Boolean(localStorage.getItem(dapplet.id))
  );
  const { width } = useWindowDimensions();

  const isDesktop = width ? width > MOBILE_SCREEN_SIZE : false;

  const { data, loading, error } = useFetch<TagType>(
    `${API_BASE_URL}/tags`,
    "GET"
  );

  const handleInstall = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, dappletID: string) => {
      e.stopPropagation();
      const isInstalled = Boolean(localStorage.getItem(dappletID));

      if (isInstalled) {
        localStorage.removeItem(dappletID);
        setIsInstalled(false);
      } else {
        localStorage.setItem(dappletID, "true");
        setIsInstalled(true);
      }
    },
    []
  );

  return (
    <div onClick={() => setExpanded(!expanded)} className={cn(css.root)}>
      <div className={css.container}>
        <div className={css.header}>
          <div className={css.subHeader}>
            <FallbackedImage
              fallBackUrl={FALLBACK_LOGO}
              className={css.logo}
              url={`${API_BASE_URL}/files/${dapplet.icon}`}
            ></FallbackedImage>

            <div className={css.heading}>
              <div className={css.title}>{dapplet.text_2}</div>
              <div className={css.subtitle}>{dapplet.author}</div>
            </div>
          </div>

          <div className={css.install}>
            {isDesktop ? (
              <Button>install</Button>
            ) : (
              <Button
                className={cn({ [css.installed]: isInstalled })}
                onClick={(e) => handleInstall(e, dapplet.id)}
                size="xs"
              >
                {localStorage.getItem(dapplet.id) ? <Installed /> : <Install />}
              </Button>
            )}
          </div>
        </div>

        <div className={css.description}>{dapplet.description}</div>

        {data && (
          <div className={css.tags}>
            {dapplet.tags.map((dappletTag) => {
              const tag = data.find((tag) => dappletTag === tag.id);
              return tag && <Tag key={tag.id}>{tag.name}</Tag>;
            })}
          </div>
        )}
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto" },
              collapsed: { height: "0" },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div style={{ marginBottom: "10px" }} className={css.subtitle}>
              {dapplet.title}
            </div>
            <div className={css.description}>{dapplet.text_1}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dapplet;
