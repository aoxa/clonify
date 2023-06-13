import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import { Home, Login } from "./components";
import React, { useEffect, useState } from "react";
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { validateUser } from "./api";
import { useStateValue } from "./context/StateProvider";
import { actionType } from "./context/reducer";

function App() {
  const [{ user }, dispatch] = useStateValue();
  const [auth, setAuth] = useState(
    false || window.localStorage.getItem("auth") === "true"
  );

  const navigate = useNavigate();

  const firebaseAuth = getAuth(app);

  useEffect(() => {
    firebaseAuth.onAuthStateChanged((userCreds) => {
      if (userCreds) {
        userCreds.getIdToken().then((token) => {
          console.log(token);
          validateUser(token).then((data) => {
            dispatch({
              type: actionType.SET_USER,
              user: data,
            });
          });
        });
      } else {
        setAuth(false);
        window.localStorage.setItem("auth", "false");
        navigate("/login");
      }
    });
    if ("true" !== window.localStorage.getItem("auth")) navigate("/login");
  }, []);

  return (
    <AnimatePresence mode="wait">
      <div className="h-auto min-w-[680px] bg-primary flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login setAuth={setAuth} />}></Route>
          <Route path="/*" element={<Home />}></Route>
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default App;
