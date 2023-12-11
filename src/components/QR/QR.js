import React from "react";
import QRCode from "react-qr-code";

const QR = ({ value }) => {

  return (
    <div style={{ height: "auto", maxWidth: 120, width: "100%" }}>
      <QRCode
        size={256}
        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        value={value}
        viewBox={`0 0 256 256`}
      />
    </div>
  );
};

export default QR;
