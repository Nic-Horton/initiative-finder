import React from "react";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import SideCreation from "./SideCreation";
import Toolbar from "@mui/material/Toolbar";
//For search
import SearchBar from "./SearchBar";
import { useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import { Paper } from "@mui/material";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    primary: {
      main: 'rgba(200, 184, 116)', // Set your custom color as the primary color
    },
  },
  components: {
    MuiTab: {
      styleOverrides: {
        root: {
          color: 'rgb(255,0,0)', // Set the color of non-selected tabs to red
          '&.Mui-selected': {
            color: 'rgba(200, 184, 116)', // Set the color of the selected tab to your custom color
          },
        },
      },
    },
  },
});

//set width based on breakpoints
const drawerWidth = {
  xs: 270,
  sm: 300,
  md: 350,
  lg: 450,
};

//Wrapper to make sure when drawer open an closes the content two the side of it is pushed to the side accordingly
export const Main = styled("main", {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  [theme.breakpoints.up("xs")]: {
    marginLeft: `-${drawerWidth.xs}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  },
  [theme.breakpoints.up("sm")]: {
    marginLeft: `-${drawerWidth.sm}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  },
  [theme.breakpoints.up("md")]: {
    marginLeft: `-${drawerWidth.md}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  },
  [theme.breakpoints.up("lg")]: {
    marginLeft: `-${drawerWidth.lg}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  // gets content to be below the AppBar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
  marginTop: 12,
  
}));

function SearchDrawer({ addUnitsToBattle, open, setOpen }) {
  const [category, setCategory] = useState("characters");
  const [combatantList, setCombatantList] = useState([
    { monsterList: [], characterList: [] },
  ]);
  const [search, setSearch] = useState("");

  const handleTabChange = (event, newCategory) => {
    setSearch('');
    setCategory(newCategory);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {open ? null : <Toolbar/>}
      <Box sx={{ mt: 6, position:'fixed'}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="end"
          sx={{ ml: 1, mr: 2, ...(open && { display: "none" }) }}
        >
          <ChevronRightIcon fontSize="large" sx={{color:'rgba(200, 184, 116)', backgroundColor:'rgba(0,0,0,.5)', borderRadius:120}} />
        </IconButton>
      </Box>
      <Drawer
        sx={{
          width: {
            xs: drawerWidth.xs,
            sm: drawerWidth.sm,
            md: drawerWidth.md,
            lg: drawerWidth.lg,
          },
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: {
              xs: drawerWidth.xs,
              sm: drawerWidth.sm,
              md: drawerWidth.md,
              lg: drawerWidth.lg,
            },
            backgroundColor: 'rgba(38, 50, 56,0.75)',
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader />
        <Box
          sx={{
            mb: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" sx={{color:'rgba(200,184,116)'}}>
            {category === "characters" ? "Add Characters" : "Add Monsters"}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between",  }}>
          <Box
            sx={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ThemeProvider theme={customTheme}>
            <Tabs
              value={category}
              onChange={handleTabChange}
              aria-label="secondary tabs example"
            >
              <Tab value="characters" label="Characters" />
              <Tab value="monsters" label="Monsters" />
            </Tabs>
            </ThemeProvider>
          </Box>
          <Box sx={{mb:1, display: "flex", justifyContent: "flex-end" }}>
            <IconButton
              onClick={handleDrawerClose}
              edge="start"
            >
              <ChevronLeftIcon sx={{color:'rgba(200,184,116)'}} />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box component={Paper} sx={{ width: "90%",
            height:'32vh',
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: 'rgba(38, 50, 56,0.75)'
             }}>
          <SearchBar combatantList={combatantList} setCombatantList={setCombatantList} category={category} addUnitsToBattle={addUnitsToBattle} search={search} setSearch={setSearch}/>
          </Box>
          <SideCreation combatantList={combatantList} setCombatantList={setCombatantList}/>
        </Box>
      </Drawer>
    </>
  );
}

export default SearchDrawer;
