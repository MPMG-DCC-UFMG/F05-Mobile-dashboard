import { Brightness4, Brightness7, Logout } from "@mui/icons-material";
import Menu from "@mui/icons-material/Menu";
import { Avatar, Box, Grid, styled, Tooltip } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import React, { useContext } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import gsi_logo from "../../assets/gsi.png";
import light_mpmg from "../../assets/mpmg.png";
import { ThemeContext } from "../../core/contexts/ThemeContext";
import { ReadUserDTO } from "../../core/models/dto/user/ReadUserDTO";
import { useGetLoggedUser } from "../../core/network/queries/auth/queries";
import { useUserStore } from "../../core/store/user";
import useInterval from "../../hooks/useInterval";

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
	color: "#ffff ",
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
	const queryClient = useQueryClient();
	const { setUser } = useUserStore();

	const { refetch } = useGetLoggedUser();
	const loggedUser = useUserStore((state) => state.user);

	const { toggleTheme, isDark } = useContext(ThemeContext);

	const handleLogout = () => {
		localStorage.removeItem("TOKEN");
		localStorage.removeItem("ROLE");
		setUser({} as ReadUserDTO);
		queryClient.invalidateQueries();
		navigate("/");
	};

	const handleUser = () => {
		navigate("/userSettings");
	};

	const authTokenExpire = 30 * 60 * 1000; // 30 minutes

	useInterval(() => {
		refetch();
	}, authTokenExpire);

	return (
		<AppBarSetup color="primary" position="absolute" open={open}>
			<Toolbar sx={{ pr: "24px" }}>
				<Grid
					container
					style={{ display: "flex", justifyContent: "space-between" }}
				>
					<Grid
						item
						display="flex"
						alignItems="center"
						justifyContent="center"
						gap="5px"
					>
						<Tooltip title="Menu">
							<IconButton
								edge="start"
								color="secondary"
								aria-label="open-drawer"
								onClick={toggleDrawer}
								sx={{ ...(open && { display: "none" }) }}
							>
								<Menu />
							</IconButton>
						</Tooltip>
						<Avatar
							src={loggedUser ? loggedUser.picture : ""}
							style={{ width: 25, height: 25, cursor: "pointer" }}
							onClick={handleUser}
						/>
						<Tooltip title={isDark ? "Tema" : "Tema Escuro"}>
							<IconButton color="secondary" onClick={toggleTheme}>
								{isDark ? <Brightness7 /> : <Brightness4 />}
							</IconButton>
						</Tooltip>
						<Tooltip title="Logout">
							<IconButton color="secondary" onClick={handleLogout}>
								<Logout />
							</IconButton>
						</Tooltip>
					</Grid>
					<Grid item display="flex">
						<Box
							component="img"
							sx={{
								height: 45,
								width: 135,
							}}
							src={light_mpmg}
						/>
						<Box
							component="img"
							sx={{
								height: 40,
								width: 120,
							}}
							src={gsi_logo}
						/>
					</Grid>
				</Grid>
			</Toolbar>
		</AppBarSetup>
	);
}
