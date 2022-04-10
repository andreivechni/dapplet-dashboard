import React, { useEffect } from "react";

const useLockScroll = (flag: boolean) => {
  useEffect(() => {
    if (flag) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "scroll";
    }
  }, [flag]);
};

export default useLockScroll;
