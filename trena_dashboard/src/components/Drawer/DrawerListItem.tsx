import {
	Dashboard,
	LinkedCamera,
	Notifications,
	People,
} from "@material-ui/icons";
import {
	Build,
	Construction,
	ExpandLess,
	ExpandMore,
	Folder,
	LocalSee,
	Logout,
	Queue,
	Security,
	Settings,
	Troubleshoot,
} from "@mui/icons-material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import {
	Collapse,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import React from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ReadUserDTO } from "../../core/models/dto/user/ReadUserDTO";
import { useMenuStore } from "../../core/store/menu";
import { useUserStore } from "../../core/store/user";

interface MyListItemProps {
	icon: JSX.Element;
	url: string;
	iconText: string;
	sx?: object;
}

function MyListItem({ icon, url, iconText, sx }: MyListItemProps) {
	const navigate = useNavigate();
	const setUser = useUserStore((state) => state.setUser);
	const queryClient = useQueryClient();

	const handleNavigate = () => {
		if (iconText === "Sair") {
			localStorage.removeItem("TOKEN");
			localStorage.removeItem("ROLE");
			setUser({} as ReadUserDTO);
			queryClient.invalidateQueries();
			navigate(url);
			return;
		}

		navigate(url);
	};

	return (
		<ListItemButton sx={sx} onClick={handleNavigate}>
			<ListItemIcon>{icon}</ListItemIcon>
			<ListItemText primary={iconText} />
		</ListItemButton>
	);
}

export function DrawerListItem() {
	const menuState = useMenuStore();

	return (
		<List>
			<MyListItem
				icon={<Dashboard />}
				url="/dashboard"
				iconText="Tela Inicial"
			/>

			<ListItemButton onClick={menuState.toggleWorkConfig}>
				<ListItemIcon>
					<Settings />
				</ListItemIcon>
				<ListItemText
					primary="Configurações de Obra"
					primaryTypographyProps={{
						fontSize: "16px",
						style: { whiteSpace: "normal" },
					}}
				/>
				{menuState.workConfig ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={menuState.workConfig} unmountOnExit>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<EngineeringIcon />}
					url="/typeOfWork"
					iconText="Tipos de Obras"
				/>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<LinkedCamera />}
					url="/typePhoto"
					iconText="Tipos de Fotos"
				/>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<Troubleshoot />}
					url="/workStatus"
					iconText="Estado das Obras"
				/>
			</Collapse>
			<ListItemButton onClick={menuState.togglePublicWorks}>
				<ListItemIcon>
					<Build />
				</ListItemIcon>
				<ListItemText primary="Obras Públicas" />
				{menuState.publicWorks ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={menuState.publicWorks}>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<Construction />}
					url="/publicWork"
					iconText="Obras Públicas"
				/>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<Queue />}
					url="/publicWork/queue"
					iconText="Fila de Obras"
				/>
			</Collapse>

			<ListItemButton onClick={menuState.toggleInspections}>
				<ListItemIcon>
					<Folder />
				</ListItemIcon>
				<ListItemText primary="Vistorias" />
				{menuState.inspections ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>
			<Collapse in={menuState.inspections} unmountOnExit>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<Security />}
					url="/inspections"
					iconText="Vistorias Técnicas"
				/>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<LocalSee />}
					url="/collect"
					iconText="Vistorias Cidadãs"
				/>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<Queue />}
					url="/queue"
					iconText="Fila de Envios"
				/>
				<MyListItem
					sx={{ pl: 4 }}
					icon={<Notifications />}
					url="/notifications"
					iconText="Notificações"
				/>
			</Collapse>
			<MyListItem icon={<People />} url="/users" iconText="Usuários" />

			<MyListItem icon={<Logout />} url="/login" iconText="Sair" />
		</List>
	);
}
