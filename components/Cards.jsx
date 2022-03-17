import React, { useState, useEffect } from "react";
import Card from "./Card";
import axios from "axios";
import moment from "moment";

const Cards = ({ type, countRides, profile, rideDetails }) => {
  const [ride, setRide] = useState({});
  useEffect(() => {
    const refresh = () => {
      const upcomingRides = rideDetails
        .filter((c) => moment(c.date).isAfter())
        .map((c) => {
          return {
            ...c,
            distance: Math.abs(
              c.station_path[
                findClosest(c.station_path, profile.station_code)
              ] - profile.station_code
            ),
          };
        })
        .sort((a, b) => {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
      setRide((prev) => {
        return {
          ...prev,
          upcoming: upcomingRides,
        };
      });
      const pastRides = rideDetails
        .filter((c) => moment(c.date).isBefore())
        .map((c) => {
          return {
            ...c,
            distance: Math.abs(
              c.station_path[
                findClosest(c.station_path, profile.station_code)
              ] - profile.station_code
            ),
          };
        })
        .sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });
      setRide((prev) => {
        return {
          ...prev,
          past: pastRides,
        };
      });

      let items = [];

      rideDetails.map((c) => {
        if (moment(c.date).isAfter()) {
          let key = findClosest(c.station_path, profile.station_code);

          items.push({
            ...c,
            distance: Math.abs(c.station_path[key] - profile.station_code),
          });
        }
      });

      items.sort((a, b) => a.distance - b.distance);

      setRide((prev) => {
        return { ...prev, present: items };
      });
    };

    if (rideDetails && profile) {
      refresh();
      const interval = setInterval(() => refresh(), 60000);
      return () => clearInterval(interval);
    }
  }, [type, rideDetails, profile]);
  useEffect(() => {
    if (ride) countRides(ride.upcoming?.length, ride.past?.length);
  }, [ride]);

  return rideDetails ? (
    <>
      {type == "upcoming" ? (
        ride.upcoming && ride.upcoming.length > 0 ? (
          ride.upcoming.map((c, index) => (
            <Card type={type} key={index + 1} rideD={c} />
          ))
        ) : (
          <></>
        )
      ) : type === "past" ? (
        ride.past && ride.past.length > 0 ? (
          ride.past.map((c, index) => (
            <Card type={type} key={index + 1} rideD={c} />
          ))
        ) : (
          <></>
        )
      ) : ride.present && ride.present.length > 0 ? (
        ride.present.map((c, index) => (
          <Card type={type} key={index + 1} rideD={c} />
        ))
      ) : (
        <></>
      )}
    </>
  ) : (
    <></>
  );
};

export default Cards;

const findClosest = (arr, element) => {
  let from = 0,
    until = arr.length - 1;
  while (true) {
    const cursor = Math.floor((from + until) / 2);
    if (cursor === from) {
      const diff1 = element - arr[from];
      const diff2 = arr[until] - element;
      return diff1 <= diff2 ? from : until;
    }

    const found = arr[cursor];
    if (found === element) return cursor;

    if (found > element) {
      until = cursor;
    } else if (found < element) {
      from = cursor;
    }
  }
};
