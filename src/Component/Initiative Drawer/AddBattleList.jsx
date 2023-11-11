import React from "react";
import TextField from "@mui/material/TextField";
import { db, auth } from "../../Config/firebase-config";
import { useState, useEffect } from "react";
import { getDocs, collection, doc, updateDoc } from "firebase/firestore";

function AddBattleList() {
  return (
    <>
      <TextField
        label="Enter Battle Name"
        type="text"
        variant="outlined"
        // value={ ?  : ''}
        sx={{ width: "90%" }}
      />
    </>
  );
}

export default AddBattleList;
