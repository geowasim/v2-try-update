import React from "react";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./payments.css";

export default function Mada(props) {
  const count = props.itemsPrice;

  return (
    <div className="mada">
      <div className="madaItems">
        <h2>
          Mada{" "}
          <span>
            <FontAwesomeIcon
              icon={faCreditCard}
              style={{ fontSize: "30px", marginRight: "10px" }}
            />
          </span>{" "}
          مدى{" "}
        </h2>
      </div>

      <h2 className="tp wanted">
        المبلغ المطلوب :{" "}
        <span style={{ fontSize: "22px" }}> {count * 0.15 + count} ريال </span>
      </h2>
    </div>
  );
}
