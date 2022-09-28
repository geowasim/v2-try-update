import React from "react";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import { Route, Routes, Link } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Invoices from "./components/Invoices";
import Pos from "./pages/Pos";
import Reback from "./components/Reback/Reback";
import { useState, useContext, createContext } from "react";
import { auth } from "./firebase";

// const InvoiceRebackContext = createContext();

function App() {
  const [dataFromInvoice, setDatafromInvoice] = useState({});

  const readDataFromInvoiceComponent = (data) => {
    setDatafromInvoice(data);
  };

  if (true) {
    return (
      <img
        src="https://img.freepik.com/free-vector/construction-with-black-yellow-stripes_1017-30755.jpg?w=1060&t=st=1664367166~exp=1664367766~hmac=93f692d82a87844dab1ff19b531fd0b5bde601e7aa6c54026dc7a9de1fd93a66"
        alt="under-construction"
        style={{ width: "100vw", height: "100vh", margin: "0", padding: "0" }}
      />
    );
  } else {
    return (
      <div>
        <AuthContextProvider>
          <nav>
            <ul className="links">
              <li>
                <Link to="/pos">Home</Link>
              </li>
              <li>
                <Link to="/invoices">Invoices</Link>
              </li>
              <li>
                <Link to="/reback">Reback</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<Signin />} />
            {/* <Route path="/signup" element={<Signup />} /> */}
            <Route
              path="/pos"
              element={
                <ProtectedRoute>
                  <Pos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/invoices"
              element={
                <ProtectedRoute>
                  <Invoices
                  // readDataFromInvoiceComponent={readDataFromInvoiceComponent}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reback"
              element={
                <ProtectedRoute>
                  <Reback dataFromInvoice={dataFromInvoice} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthContextProvider>
      </div>
    );
  }
}

export default App;
