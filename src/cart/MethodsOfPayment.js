import React from "react";

export default function MethodsOfPayment() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: "300px",
        color: "#3d3d3d",
      }}
    >
      <h3>اختر طريقة الدفع</h3>
      <div style={{ display: "flex" }}>
        <button className="itemButton" style={{ marginRight: "5px" }}>
          كاش/cash
        </button>
        <button className="itemButton" style={{ marginRight: "5px" }}>
          بطاقة/card
        </button>
        <button className="itemButton" style={{ marginRight: "5px" }}>
          كاش و بطاقة/card & cash
        </button>
      </div>
    </div>
  );
}
