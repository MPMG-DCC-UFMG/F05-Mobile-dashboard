import {
  Dashboard,
  LinkedCamera,
  People,
  Queue,
  QueuePlayNext,
} from "@material-ui/icons";
import {
  Construction,
  ExpandLess,
  ExpandMore,
  Folder,
  LocalSee,
  Logout,
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface MyListItemProps {
  icon: JSX.Element;
  url: string;
  iconText: string;
  sx?: {};
}

function MyListItem({ icon, url, iconText, sx }: MyListItemProps) {
  const navigate = useNavigate();
  const handleNavigate = () => navigate(url);

  return (
    <ListItemButton sx={sx} onClick={handleNavigate}>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={iconText} />
    </ListItemButton>
  );
}

export function DrawerListItem() {
  const [openWorkConfiguration, setOpenWorkConfiguration] = useState(false);
  const [collects, setCollects] = useState(false);

  return (
    <List>
      <MyListItem
        icon={<Dashboard />}
        url="/dashboard"
        iconText="Tela Inicial"
      />
      <ListItemButton
        onClick={() => setOpenWorkConfiguration(!openWorkConfiguration)}
      >
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
        {openWorkConfiguration ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openWorkConfiguration} unmountOnExit>
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

      <ListItemButton onClick={() => setCollects(!collects)}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary="Trena" />
        {collects ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={collects} unmountOnExit>
        <MyListItem
          sx={{ pl: 4 }}
          icon={<QueuePlayNext />}
          url="/collect"
          iconText="Coletas"
        />
        <MyListItem
          sx={{ pl: 4 }}
          icon={<Queue />}
          url="/queue"
          iconText="Fila de Envios"
        />
        <MyListItem
          sx={{ pl: 4 }}
          icon={<LocalSee />}
          url="/collect"
          iconText="Vistorias"
        />
      </Collapse>
      <MyListItem
        icon={<Construction />}
        url="/publicWork"
        iconText="Obras Públicas"
      />
      <MyListItem icon={<People />} url="/users" iconText="Usuários" />
      <MyListItem icon={<Logout />} url="/" iconText="Sair" />
    </List>
  );
}
