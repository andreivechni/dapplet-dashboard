import React, { useCallback, useState } from "react";
import useFetch from "../../hooks/useFetch";
import {
  API_BASE_URL,
  SORT_DIRS,
  DAPPLET_SORT_FIELDS,
  DESKTOP_SCREEN_SIZE,
  MOBILE_SCREEN_SIZE,
} from "../../constatns";
import Search from "../shared/Search/Search";
import StateBar from "../StateBar/StateBar";
import Header from "../Header/Header";
import { Dapplet as DappletType } from "../../types";
import Dapplet from "./Dapplet";
import Select from "../shared/Select/Select";
import useLockScroll from "../../hooks/useScrollLock";
import Nav from "../Nav/Nav";
import useWindowDimensions from "../../hooks/useWindowDemensions";
import css from "./Listing.module.scss";

// TODO: tmp

const Listing = () => {
  const [shouldShowNav, setShouldShowNav] = useState(true);

  const [sortBy, setSortBy] = useState(DAPPLET_SORT_FIELDS[0]);
  const [direction, setDirection] = useState(SORT_DIRS.ascending);

  const { width } = useWindowDimensions();
  const isDesktop = width ? width > MOBILE_SCREEN_SIZE : false;

  const { data, loading, error, isNextPageAvailable } = useFetch<DappletType>(
    `${API_BASE_URL}/dapplets`,
    "GET",
    {
      limit: 10,
      // start: 260,
      // sort: [{ property: "rating", direction: "DESC" }],
    }
  );

  const toggleNav = useCallback(() => {
    setShouldShowNav(!shouldShowNav);
  }, [shouldShowNav]);

  useLockScroll(shouldShowNav);

  console.log(data?.[0]);

  return (
    <div className={css.root}>
      {isDesktop ? (
        <StateBar></StateBar>
      ) : (
        <Header onNavActivation={toggleNav}></Header>
      )}

      <Nav isOpen={shouldShowNav} setIsOpen={toggleNav}></Nav>

      <div className={css.content}>
        <div className={css.controls}>
          <Search />

          <Select name="sortBy" value={sortBy} onChange={setSortBy}>
            {DAPPLET_SORT_FIELDS.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </Select>

          <Select name="direction" value={direction} onChange={setDirection}>
            <option defaultValue={"true"} value="ASC">
              Ascending
            </option>
            <option value="DESC">Descending</option>
          </Select>
        </div>

        {data && (
          <div className={css.listing}>
            {data.map((item) => {
              return <Dapplet key={item.id} dapplet={item}></Dapplet>;
            })}
          </div>
        )}
      </div>

      {/*
        {loading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
      */}
    </div>
  );
};

export default Listing;
