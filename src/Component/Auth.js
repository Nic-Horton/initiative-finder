import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Container, FormControl, FormLabel } from "@mui/material";
import Button from "@mui/material/Button";
import Register from "./Register";
import { useState } from "react";
import { auth, googleProvider } from "../Config/firebase-config";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Alert } from "@mui/material";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  console.log(auth?.currentUser);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  };

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        alert("User Found-Critical Success!");
      } else {
        alert("No User Found- Please Create an Account");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.log(err);
    }
  };

  function handleClick() {
    alert("Account not found, Please create account first");
  }

  const imageURL = "https://cdn.paizo.com/image/content/Blog/20190624-4.jpg";

  return (
    <div
      style={{
        backgroundImage: `url(${imageURL})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      }}
    >
      <div>
        <Box
          component="form"
          sx={{
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Container
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "right",
              alignItems: "center",
              height: 700,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(54,69,79,0.5)",
                color: "white",
                width: 500,
                border: 1,
                borderRadius: 10,
                marginTop: 10,
                marginBottom: 5,
              }}
            >
              <h1>Initiative Finder</h1>
            </Box>
            <FormControl
              sx={{
                display: "flex",
                backgroundColor: "rgba(256,256,256,0.95)",
                flexWrap: "wrap",
                flexDirection: "column",
                border: 1,
                borderRadius: 5,
                marginTop: 5,
                padding: 5,
                alignContent: "left",
                marginLeft: 3,
                width: 200,
                justifyContent: "center",
              }}
            >
              <FormLabel
                sx={{
                  color: "black",
                  fontStyle: "oblique",
                  fontFamily: "Roboto",
                }}
              >
                {" "}
                How do you want to do this?{" "}
              </FormLabel>
              <TextField
                value={email}
                placeholder="Enter Email"
                variant="outlined"
                color="success"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
              ></TextField>

              <TextField
                sx={{ marginBottom: 2 }}
                value={password}
                type="password"
                placeholder="Enter Password"
                id="outlined-basic"
                variant="outlined"
                onChange={(e) => setPassword(e.target.value)}
              />

              <Container
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <Button
                  variant="contained"
                  color="success"
                  onClick={signIn}
                  sx={{ marginBottom: 1 }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ marginBottom: 1 }}
                  onClick={signInWithGoogle}
                >
                  Sign in with Google
                </Button>

                <Register />
                <Button
                  sx={{ marginTop: 1 }}
                  onClick={logout}
                  variant="contained"
                  disabled
                >
                  Logout
                </Button>

              </Container>
            </FormControl>
          </Container>
        </Box>
      </div>
    </div>
  );
};
