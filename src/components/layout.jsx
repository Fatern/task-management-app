import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, ListItemIcon, ListItemText, useMediaQuery, Badge, InputBase, Button, } from "@mui/material";
import { Dashboard as DashboardIcon, Person, Notifications, Settings, Search, CalendarToday, Group, Add, Menu as MenuIcon, } from "@mui/icons-material";
import Moon from "../assets/full-moon.png";
import Sun from "../assets/sun.png";

const Layout = ({ onLogout }) => {
  const [darkMode, setDarkMode] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(true);
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();

  React.useEffect(() => {
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
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Profile Teams", icon: <Person />, path: "/profiles" },
    { text: "Calendar", icon: <CalendarToday />, path: "/calendar" },
    { text: "Create Staff", icon: <Group />, path: "/create" },
    { text: "Create Task", icon: <Add />, path: "/tasks" },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      {/* INI Sidebar */}
      <Drawer
        variant={isMobile ? "temporary" : "persistent"}
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        classes={{ paper: "bg-blue-500 dark:bg-gray-900 p-7" }}
      >
        <div className="p-5 flex justify-between items-center dark:text-gray-100">
          <h2 className="text-lg font-bold">Menu</h2>
          {isMobile && (
            <IconButton onClick={toggleDrawer} className="text-gray-100">
              ◀
            </IconButton>
          )}
        </div>
        <List>
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              className="hover:bg-gray-100 text-gray-400"
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon className="dark:bg-gray-900">{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* INI Main Content */}
      <div
        className={`flex-1 flex flex-col transition-all duration-300 ${
          drawerOpen && !isMobile ? "ml-60" : ""
        }`}
      >
        {/* INI Top Bar */}
        <AppBar position="sticky" className="bg-white dark:bg-gray-900 z-10">
          <Toolbar className="flex justify-between items-center">
            <IconButton edge="start" color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>

            <div className="flex items-center space-x-2 bg-white dark:bg-gray-600 rounded px-2 py-1 flex-1 max-w-md">
              <Search className="text-gray-400" />
              <InputBase
                placeholder="Search..."
                className="text-white w-full"
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            <div className="flex items-center space-x-4">
              <IconButton color="inherit">
                <Badge badgeContent={4} color="error">
                  <Notifications />
                </Badge>
              </IconButton>

              <IconButton color="inherit">
                <Settings />
              </IconButton>

              {/*INI Toggle Dark Mode */}
              <IconButton onClick={toggleDarkMode} className="p-2">
                {darkMode ? (
                  <img src={Sun} alt="Light Mode" className="h-6 w-6" />
                ) : (
                  <img src={Moon} alt="Dark Mode" className="h-6 w-6" />
                )}
              </IconButton>

              {/*INI Logout Button */}
              <div className="bg-black">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
