import React, { useState, useEffect } from "react";
import Moon from "../assets/full-moon.png";
import Sun from "../assets/sun.png";
import {AppBar,Toolbar,IconButton,InputBase,Badge,Drawer,List,ListItem,ListItemIcon,ListItemText,useMediaQuery,
} from "@mui/material";
import {Person,Notifications,Settings,Search,Dashboard as DashboardIcon,CalendarToday,Group,Contacts,BarChart,Add,Menu as MenuIcon,
} from "@mui/icons-material";

const Dashboard = ({ onLogout }) => {
  const [darkMode, setDarkMode] = useState(false);
  const isMobile = useMediaQuery("(max-width:768px)");
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(storedMode);
    if (storedMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    if (newMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon /> },
    { text: "Profiles", icon: <Person /> },
    { text: "Calendar", icon: <CalendarToday /> },
    { text: "Create User", icon: <Add /> },
    { text: "Contact Information", icon: <Contacts /> },
    { text: "Manage Teams", icon: <Group /> },
    { text: "Chart", icon: <BarChart /> },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        className="w-60 p-0 m-0"
        classes={{ paper: "bg-gray-800 dark:bg-gray-700 text-gray-100" }}
      >
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-bold">Menu</h2>
          {isMobile && (
            <IconButton onClick={toggleDrawer} className="text-gray-100">
              ◀
            </IconButton>
          )}
        </div>
        <List>
          {menuItems.map((item, index) => (
            <ListItem button key={index} className="hover:bg-gray-700">
              <ListItemIcon className="text-gray-400">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          drawerOpen && !isMobile ? "" : ""
        }`}
      >
        {/* Top Bar */}
        <AppBar position="sticky" className="bg-gray-800 dark:bg-gray-700 z-10">
          <Toolbar className="flex justify-between items-center">
            {/* Menu Button for Mobile */}
            {isMobile && (
              <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            )}

            {/* Search Bar */}
            <div className="flex items-center space-x-2 bg-gray-700 dark:bg-gray-600 rounded px-2 py-1 flex-1 max-w-md">
              <Search className="text-gray-400" />
              <InputBase
                placeholder="Search..."
                className="text-white w-full"
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              <IconButton color="inherit">
                <Person />
              </IconButton>

              <IconButton color="inherit">
                <Settings />
              </IconButton>

              {/* Toggle Dark Mode */}
              <IconButton onClick={toggleDarkMode} className="p-2">
                {darkMode ? (
                  <img src={Sun} alt="Light Mode" className="h-6 w-6" />
                ) : (
                  <img src={Moon} alt="Dark Mode" className="h-6 w-6" />
                )}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>

        <main className="p-6">
          <h2 className="text-xl">Welcome to the Dashboard!</h2>
        </main>

        <footer className="p-4 text-center text-gray-500 dark:text-gray-400">
          HOMLAAA
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
