import React, { useEffect, useState } from "react";
import Image from "next/image";
import location from "../assets/location.png";
import styles from "../styles/Card.module.css";
import moment from "moment";
const Card = ({ rideD, type }) => {
  return (
    <div className={styles.cardContainer}>
      <Image
        src={rideD.map_url}
        alt="location"
        width="300"
        height="150"
        className="imageStyle"
      />
      <div style={{ flex: 1 }}>
        <div className={styles.topContent}>
          {" "}
          <p>
            Ride Id : <span>{rideD.id}</span>
          </p>
          <div>
            <div className={styles.content}>{rideD.city}</div>
            <div className={styles.content}>{rideD.state}</div>
          </div>
        </div>
        <p>
          Origin Station : <span>{rideD.origin_station_code}</span>
        </p>
        <p>
          Station Path : <span>{`[ ${rideD.station_path.join(", ")} ]`}</span>
        </p>
        <p>
          Date : <span>{moment(rideD.date).format("Do MMM YYYY HH:MM")}</span>
        </p>
        <p>
          Distance : <span>{rideD.distance}</span>
        </p>
      </div>
    </div>
  );
};

export default Card;
