import React from "react";

const Footer = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px 0",
        background: "#101010",
        color: "#fff",
      }}
    >
      Edvora &copy; {new Date().getFullYear()}
    </div>
  );
};

export default Footer;
