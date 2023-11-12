import React, { useEffect, useState } from "react";
import { auth } from "../Config/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });
  }, []);
  return (
    <div>{authUser ? console.log("signed in") : console.log("signed out")}</div>
  );
};

export default AuthDetails;
