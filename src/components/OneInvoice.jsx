import React from "react";
import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";

import { InvoiceToPrint } from "./InvoiceToPrint/InvoiceToPrint";
import { useReactToPrint } from "react-to-print";
import { FaRegTrashAlt, FaPrint } from "react-icons/fa";

import "./OneInvoice.css";
// import Reback from "./Reback/Reback";
import { createContext } from "react";
import { totalBeforeAfterOfferType } from "../OfferFunction";

export const InvoiceContext = createContext();

const OneInvoice = ({
  todo,
  toggleComplete,
  deleteTodo,
  handleEdit,
  readDataFromInvoiceComponent,
}) => {
  const { cartItems, methodArray, invoiceNumber, off } = todo;
  const [cartItemsArrays, setCarItemsArrays] = useState([]);

  useEffect(() => {
    const arr = [];
    for (const key in cartItems) {
      if (Object.hasOwnProperty.call(cartItems, key)) {
        const element = cartItems[key];
        arr.push(element);
      }
    }
    setCarItemsArrays(arr);
  }, [cartItems]);

  const otherPrice = totalBeforeAfterOfferType(cartItemsArrays).otherPrice;
  const perfumePrice = totalBeforeAfterOfferType(cartItemsArrays).after;

  const subtotal = perfumePrice + otherPrice;
  // console.log("off", off);
  // const subtotal = Math.round(todo.totalPrice);
  const totalItems = cartItemsArrays.reduce((a, c) => a + c.qty, 0);

  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  // const navigate = useNavigate();

  // const rebackHandler = (todo) => {
  //   readDataFromInvoiceComponent(todo);
  //   navigate("/reback");
  // };

  return (
    <InvoiceContext.Provider
      value={{
        cartItems,
        methodArray,
        invoiceNumber,
        cartItemsArrays,
        subtotal,
        off,
      }}
    >
      <div className="myOneInvoice">
        <p>{todo.invoiceNumber.sn}</p>
        <p>{(subtotal * 15) / 100 + subtotal}</p>
        <p>{totalItems}</p>
        <p>{methodArray.method}</p>
        <p>{todo.dateMyPC}</p>

        <p
          onClick={function () {
            handlePrint();
          }}
          style={{
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <FaPrint />
        </p>
        {/* <p onClick={() => handleEdit(todo.id, todo)}>
          <FaEdit />
        </p>
        <Reback />
        <p onClick={() => rebackHandler(todo)}>Edit</p> */}

        <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
        <div style={{ display: "none" }}>
          <InvoiceToPrint
            todo={todo}
            ref={componentRef}
            cartItemsArrays={cartItemsArrays}
            methodArray={methodArray}
            invoiceNumber={invoiceNumber}
            subtotal={subtotal}
          />
        </div>
      </div>
    </InvoiceContext.Provider>
  );
};

export default OneInvoice;
