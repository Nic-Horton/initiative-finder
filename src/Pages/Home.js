import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Card, Container, tableBodyClasses } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const steps = [
  "Select Campaign",
  "Create Characters or Monsters",
  "Add to Initiative Tracker",
  "Roll Initiative!",
];
export default function Home() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  function handleLearnMoreClick () {
    alert("add github link here")
  }
  return (
    <>
      <div
        style={{
          backgroundImage: `url('https://w.wallhaven.cc/full/ox/wallhaven-oxq529.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          width: "100%",
          backdropFilter: "blur(500px)",
        }}
      >
        <Grid container direction="column" alignItems="center" justify="center">
          <Grid item>
            {/* <img
              src="https://foundryvtt.s3.us-west-2.amazonaws.com/website-media-dev/user_671/asset/pathfinder-second-edition-system-logo-2023-01-20.webp"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "25vh",
                width: "80vh",
                marginTop:50,
                
              }}
              alt="pathfinder logo"
            ></img> */}
          </Grid>
        </Grid>

        {/* <Box>
        <Container sx={{
            display: "flex",
            flexDirection: "row",
            alignh1s: "flex-start",
            
          }}>
            <h1>"hello" </h1></Container>
            <Container sx={{
                display: "flex",
                flexDirection:"row",
              }}><h2>"goodbye"</h2></Container>
              <Grid xs={8}><h1>"Hello"</h1> </Grid> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            direction="row"
            alignItems="flex-start"
            columns={16}
          >

              <Typography
                sx={{
                  textAlign: "center",
                  marginTop: 10,
                  color: "white",
                  maxWidth: 1000,
                  width:800,
                  marginLeft: "auto",
                  marginRight: "auto",
                  border: 1,
                  borderRadius: 2,
                  marginBottom:25,
                  backgroundColor: "rgba(0,0,0,0.7)",
                }}
                variant="h1"
                gutterBottom
              >
                Initiative Finder
              </Typography>

            <Grid
              item
              xs={16}
              sx={{
                textAlign: "center",
                maxWidth: "1000px",
                margin: "auto",
                padding: "20px",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                    justifyContent:'center',
                    alignContent:'center',
                  width:800,
                  marginLeft:"auto",
                  marginRight:"auto",
                  borderRadius: 5,
                  backgroundColor: "rgba(51,0,0,0.8)",
                  color: "rgba(255,229,204)",
                }}
              >
                Dive into the immersive world of Golarion with confidence and precision using the "Initiative Finder" app- the digital browser-based companion for Game Masters. Whether you're navigating a treacherous dungeon, facing off against fearsome foes, or weaving intricate tales of heroism with your friends, this app is your key to mastering the art of monster and character management in the thrilling and ever changing realm of Pathfinder 2nd Edition.
              </Typography>
            </Grid>
          </Grid>
          
        </Box>
        <Box textAlign='center'>
        <Button sx={{ fontWeight:'bold', color:"rgb(255,215,0)", backgroundColor:"rgba(51,0,0,1)",fontSize:25, width:500, height:100}} size="large" href="/Login" color="success" variant="contained">
            Let's Get Started!
        </Button>
        </Box>
      </div>

      <div
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/pw/ADCreHfliqgS5LvWrAE8YV_KPcMaTMM9O6287ACwbizo8pnsZbnksv8jhwe5Qk6IXTzJ0LSRwn9VJ6xku4qWQUyP4ni2U2V2tbS77IWHQR05QA-FdkYFDpFU1-7Y1n0zbcn4iptkhqf9sEktIKjvxO9Jagu5MQDI7c1AyGMIwp-C2amAKpgClSylUNNKs0jJ7geimpwbXGttrapz1Id7THAJENdAajkOp1Po4K--rSlwXrEb5tQMdIHsm7-sAkgLQ8rln273gP6_WXKD28On1k9EFMmDSr6A6WR0rtE5ag_eWs6B2sZjDH2UxuzF7TrEkWiYhiSZRVji-dn3UPTZzVU_x1Jnrr-Ag3tqjWLbss93hGD8icsF21rZUD4DBMetolvT_FsOKEKW3aVx1uKRLphYkY0VbkEHD4CWoBXSoe2jkAvO1X4-2ln8w87_y7bvmGVjFZ7SDXfVPaaHwah9ZHtsXF1ukxfOeF025hqzuCQzYOHMCrwB298i9Al8eoaHUSzFWBsfF62eWX4DeGKhTzOKf2sLc9WLV4TOB7nR7vUbxPXWYBMFSA5JPaU2OqGxBj8chiRC4-_j3C9iQqve32s56_mU5006Tp9tPHPjzu9AweBda3IJ8cSvTIyXMEcImP56zX06uQyqP8vKMdga5JxO0r2rxhrwgEKyPqtJfthiCs7CtWBJ1LY78J4gWSHJWuFLcQ6CutWHNGwTx8l8PqASHfMlp5g5zI2MUvqeHDU0idPgvvz59Z8GaynsSdmCsRcVjLo3BM1VjnjmpOfMMNlTlCpOefrG-d81oo0GHXXWa4GeT2Fjps2_WFRWzd_4upQQpCHxcTO1XwRjsNmmafxELtaU1jhzvl62yOM-Adw3waPU9pj1eyLn4tPPGWWs_jW4bsTNgQZKNvTs1BnBmtiIYUccsjjVwOHa8Hq0k2ONiX2PwzG35hvwFjthntw=w1416-h1066-s-no?authuser=0')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            color: "white",
          }}
        >
          <h1
            style={{
              marginTop: 20,
              textAlign: "center",
              backgroundColor: "rgba(0,0,0,0.7)",
              color: "#cfe8fc",
            }}
          >
            How does it work?
          </h1>
          {/* rename to how to use? */}
          <Container>
            <Box sx={{ color: "white", width: "100%" }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                    labelProps.optional = (
                      <Typography variant="caption">Optional</Typography>
                    );
                  }
                  if (isStepSkipped(index)) {
                    stepProps.completed = false;
                  }
                  return (
                    <Step style={{ color: "white" }} key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    All steps completed - you&apos;re finished
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleReset}>Reset</Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    Step {activeStep + 1}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color="inherit"
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}

                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Container>
        </Box>
      </div>
      <div>
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            backgroundColor: "rgba(38,50,56,1)",
            color: "#cfe8fc",
          }}
        >
          Meet The Team
        </Typography>
        <Box display="flex">
          <Container>
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                  <Avatar
                    alt="Larry Le"
                    src="https://ca.slack-edge.com/T0569RDC6-U051D0R0NG4-9fcd9f89cca9-48"
                  ></Avatar>
                  Larry Le
                </Typography>
                <Typography variant="body2">
                  Starry Citizen
                  <br />
                  {'Atlanta, GA'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Container>
          <Container>
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  <Avatar
                    alt="Derek Szeto"
                    src="https://ca.slack-edge.com/T0569RDC6-U04T84BP9GW-2e2bc9b66cb0-48"
                  ></Avatar>
                  Derek Szeto
                </Typography>
                <Typography variant="body2">
                  Case of the Munchies
                  <br />
                  {'Atlanta, GA'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Container>
          <Container>
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                  <Avatar
                    alt="Brett MacKinnon"
                    src="https://ca.slack-edge.com/T0569RDC6-U04URA7Q8E9-d5f989e8d954-48"
                  ></Avatar>
                  Brett MacKinnon
                </Typography>
                <Typography variant="body2">
                  Pathfinder Guru
                  <br />
                  {'Atlanta, GA'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Container>
          <Container>
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                  <Avatar
                    alt="Nicolas Horton"
                    src="https://ca.slack-edge.com/T0569RDC6-U053KR0242U-1764cf7e4690-48"
                  ></Avatar>
                  Nicolas Horton
                </Typography>
                <Typography variant="body2">
                  Tech Guru
                  <br />
                  {'Houston,Texas'}
                </Typography>
              </CardContent>
              <CardActions>
                <Button onClick={handleLearnMoreClick}size="small">Learn More</Button>
              </CardActions>
            </Card>
          </Container>
        </Box>
      </div>
    </>
  );
}
