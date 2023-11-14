
import * as React from "react";
import Box from "@mui/material/Box";
import { Avatar, Card, Container, IconButton, tableBodyClasses } from "@mui/material";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Grid } from "@mui/material";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button/";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";
import Navbar from "../Component/Navbar";
import { useState } from "react";
import AppSteps from "../Component/Stepper";
import LinkedInIcon from "@mui/icons-material/LinkedIn";


const steps = [
	'Select Campaign',
  
	'Create Characters or Monsters',
	'Add to Initiative Tracker',
	'Roll Initiative!',
];
export default function Home() {

	const [activeStep, setActiveStep] = useState(0);
	const [completed, setCompleted] = useState([]);

	const totalSteps = () => {
		return steps.length;
	};


	const completedSteps = () => {
		return Object.keys(completed).length;
	};

	const isLastStep = () => {
		return activeStep === totalSteps() - 1;
	};

	const allStepsCompleted = () => {
		return completedSteps() === totalSteps();
	};

	const handleNext = () => {
		let newActiveStep;

		if (isLastStep() && !allStepsCompleted()) {
			newActiveStep = steps.findIndex((step, i) => !completed.includes(i));
		} else {
			newActiveStep = activeStep + 1;
		}

		setActiveStep(newActiveStep);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	const handleStep = (step: number) => () => {
		setActiveStep(step);
	};

	const handleComplete = () => {
		const newCompleted = completed;
		newCompleted[activeStep] = true;
		setCompleted(newCompleted);
		handleNext();
	};

  return (
    <>
    <Navbar />
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
					</Grid>
				</Grid>

				<Box sx={{ flexGrow: 1 }}>
					<Grid container direction="row" alignItems="flex-start" columns={16}>
						<Typography
							sx={{
								textAlign: 'center',
								marginTop: 10,
								color: 'white',
								maxWidth: 1000,
								width: 800,
								marginLeft: 'auto',
								marginRight: 'auto',
								border: 1,
								borderRadius: 5,
								marginBottom: 25,
								backgroundColor: 'rgba(0,0,0,0.7)',
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
<div>
  
</div>
      <div
        style={{
          backgroundImage: `url('https://slyflourish.com/images/printed_map.jpg')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          height: "50vh",
          width: "100%",
        }}
      >

<Box sx={{ width: '100%' }}>
      <Stepper alternativeLabel nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step sx={{mt:3, color:'blue'}}key={label} completed={completed[index]}>
            <StepButton sx={{p:0,
              backgroundColor:"rgb(38,50,56)", 
              border:1,
              borderRadius:2,
              borderColor:'white',
            }} 
              onClick={handleStep(index)}>
            <Typography variant="button" sx={{fontSize:'large', color: 'white' }}>
      {label}
    </Typography>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ backgroundColor:'red',mt: 2, mb: 1, py: 1 }}>
              Step {activeStep + 1}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button 
              disabled={activeStep === 4} 
              onClick={handleNext} 
              sx={{ mr: 1 }}>
                Next
              </Button>
            </Box>
          </React.Fragment>
        )}
      </div>
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
                <IconButton
                label="LinkedIn"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/lelarry/",
                    "_blank"
                  )
                }
              >
                <LinkedInIcon
                  sx={{ color: "blue", fontSize: "3rem" }}
                />
              </IconButton>
              <Button
                variant="text"
                size="small"
                href="https://github.com/lelarry26"
              >
                <img
                  height={40}
                  src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
                  alt="GitHub"
                  // style={{ filter: "brightness(100) saturate(100%)" }}
                />
              </Button>
              </CardActions>
            </Card>
          </Container>
          <Container>
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
                <Typography variant="h5" color="text.primary" gutterBottom>
                  <Avatar
                    alt="Derek Szeto"
                    src="https://media.licdn.com/dms/image/C4E03AQGRhpryroBqQw/profile-displayphoto-shrink_400_400/0/1551731556984?e=1705536000&v=beta&t=fTHQuRFJ31ndZ0jlYI8bz5Z_fzQm25rYtvl2eULbkIQ"
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

              <IconButton
                label="LinkedIn"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/derek-szeto-876422179/",
                    "_blank"
                  )
                }
              >
                <LinkedInIcon
                  sx={{ color: "blue", fontSize: "3rem" }}
                />
              </IconButton>
              <Button
                variant="text"
                size="small"
                href="https://github.com/MidnightMicro"
              >
                <img
                  height={40}
                  src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
                  alt="GitHub"
                  // style={{ filter: "brightness(100) saturate(100%)" }}
                />
              </Button>
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
                  Atlanta, GA
                </Typography>
              </CardContent>
              <CardActions>
              <IconButton
                label="LinkedIn"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/brett-mackinnon-19936111a/",
                    "_blank"
                  )
                }
              >
                <LinkedInIcon
                  sx={{ color: "blue", fontSize: "3rem" }}
                />
              </IconButton>
              <Button
                variant="text"
                size="small"
                href="https://github.com/JudgeBreaded"
              >
                <img
                  height={40}
                  src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
                  alt="GitHub"
                  // style={{ filter: "brightness(100) saturate(100%)" }}
                />
              </Button>
              </CardActions>
            </Card>
          </Container>
          <Container>
            <Card sx={{ minWidth: 200 }}>
              <CardContent>
              <Typography variant="h5" color="text.primary" gutterBottom>
                  <Avatar
                    alt="Nicolas Horton"
                    src="https://media.licdn.com/dms/image/D5603AQHfiJdd74VAWA/profile-displayphoto-shrink_400_400/0/1694828022884?e=1705536000&v=beta&t=IslYJ0BSSINmlQA8to684ICe6r-U_4TOa46uy4QuljY"
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
              <IconButton
                label="LinkedIn"
                onClick={() =>
                  window.open(
                    "https://www.linkedin.com/in/nicolas-horton/",
                    "_blank"
                  )
                }
              >
                <LinkedInIcon
                  sx={{ color: "blue", fontSize: "3rem" }}
                />
              </IconButton>
              <Button
                variant="text"
                size="small"
                href="https://github.com/Nic-Horton"
              >
                <img
                  height={40}
                  src="https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png"
                  alt="GitHub"
                  // style={{ filter: "brightness(100) saturate(100%)" }}
                />
              </Button>
              </CardActions>
            </Card>
          </Container>
        </Box>
      </div>
    </>
  );

}
