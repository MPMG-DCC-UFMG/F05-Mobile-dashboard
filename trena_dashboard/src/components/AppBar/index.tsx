import { Logout } from "@mui/icons-material";
import Menu from "@mui/icons-material/Menu";
import { Avatar, styled, Typography } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  LoggedUserResponse,
  SecurityServiceQuery,
} from "../../core/network/services/SecurityService";

interface AppBarProps {
  open?: boolean;
  toggleDrawer(): void;
}

interface AppBarSetup {
  open?: boolean;
}

const AppBarSetup = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarSetup>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export function AppBar({ open, toggleDrawer }: AppBarProps) {
  const navigate = useNavigate();
  const { data: loggedUserData } = useQuery<LoggedUserResponse>([
    "appBarIcon",
    () => SecurityServiceQuery.getLoggedUser(),
  ]);

  const handleLogout = () => {
    navigate("/login");
  };

  const handleUser = () => {
    navigate("/userSettings");
  };

  return (
    <AppBarSetup color="primary" position="absolute" open={open}>
      <Toolbar sx={{ pr: "24px" }}>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open-drawer"
          onClick={toggleDrawer}
          sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
        >
          <Menu />
        </IconButton>
        <Typography
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          {"Dashboard - Trena"}
        </Typography>
        <Avatar
          src={loggedUserData ? loggedUserData.picture : ""}
          style={{ width: 25, height: 25, cursor: "pointer" }}
          onClick={handleUser}
        />
        <IconButton onClick={handleLogout}>
          <Logout htmlColor="#FFFFFF" />
        </IconButton>
      </Toolbar>
    </AppBarSetup>
  );
}
