import React from 'react'
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled } from '@mui/material/styles';

//set width based on breakpoints
const drawerWidth = {
	xs: 270,
	sm: 300,
	md: 350,
	lg: 450,
};

//Wrapper to make sure when drawer open an closes the content two the side of it is pushed to the side accordingly
export const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		transition: theme.transitions.create('margin', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		[theme.breakpoints.up('xs')]: {
			marginLeft: `-${drawerWidth.xs}px`,
			...(open && {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			}),
		},
		[theme.breakpoints.up('sm')]: {
			marginLeft: `-${drawerWidth.sm}px`,
			...(open && {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			}),
		},
		[theme.breakpoints.up('md')]: {
			marginLeft: `-${drawerWidth.md}px`,
			...(open && {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			}),
		},
		[theme.breakpoints.up('lg')]: {
			marginLeft: `-${drawerWidth.lg}px`,
			...(open && {
				transition: theme.transitions.create('margin', {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			}),
		},
	})
);

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	// gets content to be below the AppBar
	...theme.mixins.toolbar,
	justifyContent: 'flex-end',
	marginTop: 15,
}));

function SearchDrawer({open,setOpen}) {

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

  return (
   <>
    <Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: 'none' }) }}
					>
						<ChevronRightIcon />
					</IconButton>
				</Toolbar>
				<Drawer
					sx={{
						width: {
							xs: drawerWidth.xs,
							sm: drawerWidth.sm,
							md: drawerWidth.md,
							lg: drawerWidth.lg,
						},
						flexShrink: 0,
						'& .MuiDrawer-paper': {
							width: {
								xs: drawerWidth.xs,
								sm: drawerWidth.sm,
								md: drawerWidth.md,
								lg: drawerWidth.lg,
							},
							boxSizing: 'border-box',
						},
					}}
					variant="persistent"
					anchor="left"
					open={open}
				>
					<DrawerHeader />
					<IconButton color="inherit" onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
					<Divider />
				</Drawer>
   </>
  )
}

export default SearchDrawer