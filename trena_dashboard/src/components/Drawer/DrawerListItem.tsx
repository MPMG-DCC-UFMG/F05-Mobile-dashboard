import {
  Chat,
  Dashboard,
  History,
  LinkedCamera,
  People,
} from "@material-ui/icons";
import {
  Announcement,
  Build,
  Construction,
  ExpandLess,
  ExpandMore,
  Folder,
  LocalSee,
  Logout,
  MarkChatUnread,
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
import React, { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { rootContext } from "../../core/contexts/RootContext";
import { useStores } from "../../core/contexts/UseStores";
import { LoggedUser } from "../../core/stores/UserStore";
import { OpenCallDialog } from "../Dialogs/Call/OpenCallDialog";

interface MyListItemProps {
  icon: JSX.Element;
  url: string;
  iconText: string;
  sx?: {};
}

function MyListItem({ icon, url, iconText, sx }: MyListItemProps) {
  const navigate = useNavigate();
  const { userStore } = useContext(rootContext);
  const queryClient = useQueryClient();

  const handleNavigate = () => {
    if (iconText === "Sair") {
      localStorage.removeItem("TOKEN");
      localStorage.removeItem("ROLE");
      userStore.updateLoggedUser({} as LoggedUser);
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
  const { userStore } = useContext(rootContext);
  const { collapseStore } = useStores();
  const [workConfig, setWorkConfig] = useState(collapseStore.workConfig);
  const [trena, setTrena] = useState(collapseStore.trena);
  const [publicWork, setPublicWork] = useState(collapseStore.publicWork);
  const [chat, setChat] = useState(collapseStore.chat);
  const [openCall, setOpenCall] = useState(false);

  const handleToggleWorkConfig = () => {
    setWorkConfig(!workConfig);
    collapseStore.toggleWorkConfiguration();
  };

  const handleToggleTrena = () => {
    setTrena(!trena);
    collapseStore.toggleTrena();
  };

  const handleTogglePublicWorks = () => {
    setPublicWork(!publicWork);
    collapseStore.togglePublicWork();
  };

  const handleToggleChat = () => {
    setChat(!chat);
    collapseStore.toggleChat();
  };

  const handleOpenNewCall = () => setOpenCall(true);

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
      <ListItemButton onClick={handleTogglePublicWorks}>
        <ListItemIcon>
          <Build />
        </ListItemIcon>
        <ListItemText primary="Obras Públicas" />
        {publicWork ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={publicWork}>
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
      <MyListItem icon={<People />} url="/users" iconText="Usuários" />

      <ListItemButton onClick={handleToggleChat}>
        <ListItemIcon>
          <Chat />
        </ListItemIcon>
        <ListItemText primary="Chamados" />
        {chat ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={chat} unmountOnExit>
        <MyListItem
          sx={{ pl: 4 }}
          icon={<MarkChatUnread />}
          url="/calls"
          iconText="Meus Chamados"
        />
        {userStore.loggedUser.role === "ADMIN" && (
          <ListItemButton sx={{ pl: 4 }} onClick={handleOpenNewCall}>
            <ListItemIcon>
              <Announcement />
            </ListItemIcon>
            <ListItemText primary="Novo Chamado" />
          </ListItemButton>
        )}

        <MyListItem
          sx={{ pl: 4 }}
          icon={<History />}
          url="/calls/history"
          iconText="Histórico"
        />
      </Collapse>

      <MyListItem icon={<Logout />} url="/login" iconText="Sair" />
      <OpenCallDialog state={openCall} setState={setOpenCall} />
    </List>
  );
}
