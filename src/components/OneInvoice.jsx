import React from "react";
import { useEffect, useState, useRef } from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { InvoiceToPrint } from "./InvoiceToPrint/InvoiceToPrint";
import { useReactToPrint } from "react-to-print";
import { FaRegTrashAlt, FaPrint, FaEdit } from "react-icons/fa";

import "./OneInvoice.css";
import Reback from "./Reback/Reback";
import { createContext } from "react";

export const InvoiceContext = createContext();

const OneInvoice = ({
  todo,
  toggleComplete,
  deleteTodo,
  handleEdit,
  readDataFromInvoiceComponent,
}) => {
  const { cartItems, methodArray, invoiceNumber } = todo;
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

  const subtotal = cartItemsArrays.reduce((a, c) => a + c.price * c.qty, 0);
  const totalItems = cartItemsArrays.reduce((a, c) => a + c.qty, 0);

  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  };

  const navigate = useNavigate();

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

        {/* <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button> */}
        <div style={{ display: "none" }}>
          <InvoiceToPrint
            todo={todo}
            ref={componentRef}
            cartItemsArrays={cartItemsArrays}
            methodArray={methodArray}
            invoiceNumber={invoiceNumber}
          />
        </div>
      </div>
    </InvoiceContext.Provider>
  );
};

export default OneInvoice;

/**
 *
// const style = {
//   li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
//   liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
//   row: `flex`,
//   text: `ml-2 cursor-pointer`,
//   textComplete: `ml-2 cursor-pointer line-through`,
//   button: `cursor-pointer flex items-center`,
// }; 
 * 
 * 
 *       <li className={todo.completed ? style.liComplete : style.li}>
        <div className={style.row}>
          <input
            onChange={() => toggleComplete(todo)}
            type="checkbox"
            checked={todo.completed ? "checked" : ""}
          />
          <p
            onClick={() => toggleComplete(todo)}
            className={todo.completed ? style.textComplete : style.text}
          ></p>
          <div>
            <p>method : {methodArray.method}</p>
            <p>Total: {(subtotal * 15) / 100 + subtotal}</p>
          </div>
        </div>
        <button onClick={() => deleteTodo(todo.id)}>{<FaRegTrashAlt />}</button>
      </li>
 */

/**
       *   // function calculateDateTime() {
  //   var timestamp = todo.date.seconds * 1000;
  //   var date = new Date(timestamp);

  //   return `${date.getDate()}/${
  //     date.getMonth() + 1
  //   }/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  // }

  // function handleOnePrint() {
  //   console.log(todo.invoiceNumber.sn);
  //   if (todo.invoiceNumber.sn === invoiceNumber.sn) {
  //   }
  // }
       */
