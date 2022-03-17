import React, { useContext } from "react";
import styles from "../styles/Header.module.css";
import Image from "next/image";

const Header = ({ profile }) => {
  return (
    <div className={styles.appbar}>
      <h1>Edvora</h1>
      {profile ? (
        <div className={styles.profileContainer}>
          <p>{profile.name}</p>
          <div style={{ position: "relative", width: "45px", height: "45px" }}>
            <Image
              layout="fill"
              className={styles.profileImage}
              src={profile.url}
              alt={profile.name}
              width="40"
              height="40"
            />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Header;
