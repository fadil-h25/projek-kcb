import React, { useState, useEffect } from "react";

const Alert = ({ visible }) => {
  return (
    <div style={{ padding: "20px" }}>
      {visible && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "lightblue",
            borderRadius: "5px",
          }}
        >
          Ini adalah pesan yang muncul!
        </div>
      )}
    </div>
  );
};

export default Alert;
