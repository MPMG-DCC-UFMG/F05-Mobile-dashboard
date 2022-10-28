import {
  Dashboard,
  LinkedCamera,
  People,
  Queue,
  QueuePlayNext,
} from "@material-ui/icons";
import { Construction, Logout, Troubleshoot } from "@mui/icons-material";
import EngineeringIcon from "@mui/icons-material/Engineering";
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface MyListItemProps {
  icon: JSX.Element;
  url: string;
  iconText: string;
}

function MyListItem({ icon, url, iconText }: MyListItemProps) {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(url);

  return (
    <ListItemButton onClick={handleNavigate}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={iconText} />
    </ListItemButton>
  );
}

export function DrawerListItem() {
  return (
    <List>
      <MyListItem icon={<Dashboard />} url="/dashboard" iconText="Home" />
      <Divider />
      <MyListItem
        icon={<EngineeringIcon />}
        url="/typeOfWork"
        iconText="Tipos de Obras"
      />
      <MyListItem
        icon={<LinkedCamera />}
        url="/typePhoto"
        iconText="Tipos de Fotos"
      />
      <MyListItem
        icon={<Troubleshoot />}
        url="/workStatus"
        iconText="Estado das Obras"
      />
      <Divider />
      <MyListItem icon={<Queue />} url="/queue" iconText="Fila de Envios" />
      <MyListItem
        icon={<Construction />}
        url="/publicWork"
        iconText="Obras Públicas"
      />
      <MyListItem icon={<QueuePlayNext />} url="/collect" iconText="Coletas" />
      <Divider />
      <MyListItem icon={<People />} url="/users" iconText="Usuários" />
      <MyListItem icon={<Logout />} url="/" iconText="Sair" />
    </List>
  );
}
