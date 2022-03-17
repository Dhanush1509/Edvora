import React, { createContext, useState, useEffect } from "react";
import Cards from "../components/Cards";
import Filter from "../components/Filter";
import Header from "../components/Header";
import axios from "axios";
import Footer from "../components/Footer";
const Home = () => {
  const [profile, setProfile] = useState(null);
  const [rideDetails, setRideDetails] = useState(null);
  const [filteredDetails, setFilteredDetails] = useState(null);
  const [details, setDetails] = useState({
    activeState: (name, d) => {
      let arr = ["City"],
        arr1 = [];
      if (name == "State") {
        const citySet = new Set();
        citySet.add("City");
        d.map((c) => !citySet.has(c.city) && citySet.add(c.city));
        arr = Array.from(citySet);
      } else {
        d.reduce((acc, curr) => {
          if (curr.state == name) arr.push(curr.city);
        }, arr);
        arr = Array.from(new Set(arr));
      }

      setDetails((prev) => {
        return { ...prev, activeS: name, cities: arr, activeC: arr[0] };
      });
    },
    activeCity: (name) => {
      setDetails((prev) => {
        return { ...prev, activeC: name };
      });
    },
    activeS: "State",
    activeC: "City",
  });
  useEffect(() => {
    if (rideDetails) {
      if (details.activeS == "State") {
        if (details.activeC == "City") setFilteredDetails(rideDetails);
        else
          setFilteredDetails(
            rideDetails.filter((c) => c.city == details.activeC)
          );
      } else if (details.activeS != "State") {
        if (details.activeC != "City")
          setFilteredDetails(
            rideDetails.filter(
              (c) => c.state == details.activeS && c.city == details.activeC
            )
          );
        else
          setFilteredDetails(
            rideDetails.filter((c) => c.state == details.activeS)
          );
      }
    }
  }, [details, rideDetails]);
  useEffect(() => {
    try {
      const fetchRides = async () => {
        const { data } = await axios.get(
          "https://assessment.api.vweb.app/rides"
        );
        setRideDetails(data);
        const stateSet = new Set();
        stateSet.add("State");
        data.map((c) => !stateSet.has(c.state) && stateSet.add(c.state));
        const citySet = new Set();
        citySet.add("City");
        data.map((c) => !citySet.has(c.city) && citySet.add(c.city));

        setDetails((prev) => {
          return {
            ...prev,
            cities: Array.from(citySet),
            states: Array.from(stateSet),
          };
        });
        console.log(data);
      };
      fetchRides();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await axios.get(
          "https://assessment.api.vweb.app/user"
        );
        console.log(data);
        setProfile(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={{ background: "#292929", minHeight: "100vh" }}>
      <Header profile={profile} />
      <Filter
        profile={profile}
        rideDetails={filteredDetails}
        rides={rideDetails}
        details={details}
      />
      <Footer />
    </div>
  );
};

export default Home;
