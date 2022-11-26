import { Dashboard, LinkedCamera, People } from "@material-ui/icons";
import {
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
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStores } from "../../core/contexts/UseStores";

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
  const { collapseStore } = useStores();
  const [workConfig, setWorkConfig] = useState(collapseStore.workConfig);
  const [trena, setTrena] = useState(collapseStore.trena);

  const handleToggleWorkConfig = () => {
    setWorkConfig(!workConfig);
    collapseStore.toggleWorkConfiguration();
  };

  const handleToggleTrena = () => {
    setTrena(!trena);
    collapseStore.toggleTrena();
  };

  return (
    <List>
      <MyListItem
        icon={<Dashboard />}
        url="/dashboard"
        iconText="Tela Inicial"
      />
      <ListItemButton onClick={handleToggleWorkConfig}>
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
        {workConfig ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={workConfig} unmountOnExit>
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

      <ListItemButton onClick={handleToggleTrena}>
        <ListItemIcon>
          <Folder />
        </ListItemIcon>
        <ListItemText primary="Vistorias" />
        {trena ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={trena} unmountOnExit>
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
      </Collapse>
      <MyListItem
        icon={<Construction />}
        url="/publicWork"
        iconText="Obras Públicas"
      />
      <MyListItem icon={<People />} url="/users" iconText="Usuários" />
      <MyListItem icon={<Logout />} url="/login" iconText="Sair" />
    </List>
  );
}
