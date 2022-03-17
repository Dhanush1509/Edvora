import React, { useEffect, useState } from "react";
import styles from "../styles/Filter.module.css";
import Cards from "./Cards";
import { BsFilterLeft, BsCaretDownFill, BsCaretUpFill } from "react-icons/bs";
const Filter = ({ profile, rideDetails, details, rides }) => {
  const [active, setActive] = useState("present");
  const [count, setCount] = useState({});
  const [showState, setShowState] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const countRides = (a, b) => {
    setCount({ upcoming: a, past: b });
  };
  const showDropdown = (e) => {
    setShowFilter(!showFilter);
    e.stopPropagation();
  };
  return (
    <div className={styles.Container} onClick={() => setShowFilter(false)}>
      <div className={styles.FilterContainer}>
        <div className={styles.tabs}>
          {" "}
          <div onClick={() => setActive("present")}>
            <p
              title="Nearest Rides"
              className={active == "present" ? styles.activeFilter : undefined}
            >
              Nearest Rides
            </p>
          </div>
          <div onClick={() => setActive("upcoming")}>
            {" "}
            <p
              title="Upcoming Rides"
              className={active == "upcoming" ? styles.activeFilter : undefined}
            >
              Upcoming Rides{" "}
              {count ? (count.upcoming > 0 ? `( ${count.upcoming} )` : "") : ""}
            </p>
          </div>
          <div onClick={() => setActive("past")}>
            <p
              title="Past Rides"
              className={active == "past" ? styles.activeFilter : undefined}
            >
              Past Rides{" "}
              {count ? (count.past > 0 ? `( ${count.past} )` : "") : ""}
            </p>
          </div>
        </div>

        <div
          className={styles.flexItem}
          onClick={(e) => showDropdown(e)}
          style={{ cursor: "pointer" }}
        >
          <BsFilterLeft size={20} style={{ marginRight: "10px" }} />{" "}
          <span> Filter</span>
          {showFilter && (
            <div className={styles.dropdown}>
              <div>Filters</div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowState(!showState);
                  setShowCity(false);
                }}
              >
                <div className={styles.flexItem}>
                  <span>{details.activeS}</span>
                  {!showState ? (
                    <BsCaretDownFill
                      size={20}
                      style={{ marginRight: "10px", color: "#A5A5A5" }}
                    />
                  ) : (
                    <BsCaretUpFill
                      size={20}
                      style={{ marginRight: "10px", color: "#A5A5A5" }}
                    />
                  )}
                  {showState && (
                    <div className={styles.dropdownOptions}>
                      {details.states &&
                        details.states.map((c, index) => (
                          <div
                            style={{ wordWrap: "normal" }}
                            key={index + 1}
                            id={c}
                            onClick={(e) =>
                              details.activeState(e.target.id, rides)
                            }
                          >
                            {c}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCity(!showCity);
                  setShowState(false);
                }}
              >
                <div className={styles.flexItem}>
                  <span>{details.activeC}</span>
                  {!showCity ? (
                    <BsCaretDownFill
                      size={20}
                      style={{ marginRight: "10px", color: "#A5A5A5" }}
                    />
                  ) : (
                    <BsCaretUpFill
                      size={20}
                      style={{ marginRight: "10px", color: "#A5A5A5" }}
                    />
                  )}
                  {showCity && (
                    <div className={styles.dropdownOptions}>
                      {details.cities &&
                        details.cities.map((c, index) => (
                          <div
                            style={{ wordWrap: "normal" }}
                            id={c}
                            onClick={(e) => {
                              details.activeCity(e.target.id, rides);
                              setShowFilter(false);
                            }}
                            key={index + 1}
                          >
                            {c}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Cards
        type={active}
        countRides={countRides}
        profile={profile}
        rideDetails={rideDetails}
      />
    </div>
  );
};

export default Filter;
