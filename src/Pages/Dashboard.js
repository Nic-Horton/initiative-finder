import React, { useEffect, useState } from "react";
import DashboardData from "../Component/DashboardData";
import MonsterSubmit from "../Component/MonsterSubmit";
import Box from "@mui/material/Box";
import Navbar from "../Component/Navbar";
import NavbarNoLogin from "../Component/NavBarNoLogin";
import { NavLink } from "react-router-dom";
import { auth, googleProvider } from "../Config/firebase-config";
import { Button, Container, Typography } from "@mui/material";
import CircularProgress, {circularProgressClasses} from "@mui/material/CircularProgress";

// ADD DEATH SCENE and potential gif of zelda or fire from dark souls? 

function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null); 
      }
      setLoading(false);
    });

    return () => {
      unsubscribe(); 
    };
  }, []);
  if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<CircularProgress
					variant="indeterminate"
					sx={{
						color: 'red',
						animationDuration: '600ms',
						[`& .${circularProgressClasses.circle}`]: {
							strokeLinecap: 'round',
						},
					}}
					size={80}
					thickness={4}
					value={100}
				/>
			</Box>
		);
	}

	if (loading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					height: '100vh',
				}}
			>
				<CircularProgress
					variant="indeterminate"
					sx={{
						color: 'red',
						animationDuration: '600ms',
						[`& .${circularProgressClasses.circle}`]: {
							strokeLinecap: 'round',
						},
					}}
					size={80}
					thickness={4}
					value={100}
				/>
			</Box>
		);
	}

	if (user === null) {
		return (
			<>
				<div
					style={{
						position: 'relative',
						height: '100vh',
						width: '100%',
					}}
				>
					<div
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							backgroundImage: `url('../Images/dyingWarror.jpg')`,
							height: '100vh',
							width: '100%',
							backgroundSize: 'cover',
							backgroundRepeat: 'no-repeat',
							filter: 'blur(2px)',
							zIndex: -1,
						}}
					></div>
					<div
						style={{
							zIndex: 1,
						}}
					>
						<Navbar />
						<Box
							textAlign="center"
							sx={{
								border: 3,
								borderRadius: 2,
								p: 3,
								m: 'auto',
								width: 700,
								backgroundColor: 'rgba(0,0,0,.5)',
								color: 'white',
							}}
						>
							<Typography sx={{ color: 'Red', marginTop: 10 }} variant="h2">
								Please login and try again
							</Typography>
						</Box>
						<Box sx={{ mt: 20 }} textAlign="center">
							<Button
								sx={{
									fontSize: 25,
									width: 300,
									height: 150,
								}}
								variant="contained"
								component={NavLink}
								color="error"
								to="/Login"
							>
								Click here to go re-roll
							</Button>
						</Box>
					</div>
				</div>
			</>
		);
		// You can render a loading indicator or return null here
	}

	return (
		<>
			<div
				style={{
					position: 'relative',
					height: '100vh',
					width: '100%',
				}}
			>
				<div
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						backgroundImage: `url('../Images/anvil.jpg')`,
						backgroundPosition: 'center',
						backgroundSize: 'cover',
						backgroundRepeat: 'no-repeat',
						filter: 'blur(3px)',
						zIndex: -2,
					}}
				></div>
				<div
					style={{
						zIndex: 1,
					}}
				>
					<Navbar />
					<Container>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'row',
								justifyContent: 'center',
								alignItems: 'flex-start',
							}}
						>
							<Box>
								<MonsterSubmit />
							</Box>
							<Box sx={{ ml: 5 }}>
								<DashboardData />
							</Box>
						</Box>
					</Container>
				</div>
			</div>
		</>
	);
}

export default Dashboard;
