import { Avatar, Button, Grid, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { DigitalSignature } from "../components/Dialogs/Users/DigitalSignature";
import { EditUserEmailDialog } from "../components/Dialogs/Users/UserSettings/EditUserEmail";
import { EditUserPasswordDialog } from "../components/Dialogs/Users/UserSettings/EditUserPassword";
import { Heading } from "../components/Heading";
import {
  LoggedUserResponse,
  SecurityServiceQuery,
} from "../core/network/services/SecurityService";

export function UserSettingScreen() {
  const { data: userData } = useQuery<LoggedUserResponse>(
    ["getLoggedUserData"],
    () => SecurityServiceQuery.getLoggedUser()
  );

  const [openSignatureDialog, setOpenSignatureDialog] = useState(false);
  const [openEditEmailDialog, setOpenEditEmailDialog] = useState(false);
  const [openEditPasswordDialog, setOpenEditPasswordDialog] = useState(false);

  const handleOpenSignatureDialog = () => {
    setOpenSignatureDialog(true);
  };

  const handleEditEmail = () => {
    setOpenEditEmailDialog(true);
  };

  const handleEditPassword = () => {
    setOpenEditPasswordDialog(true);
  };

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <Grid
          style={{ marginLeft: 140, width: "100%", marginTop: 14 }}
          item
          xs={9}
        >
          <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
            <Heading
              title="Perfil"
              steps={[
                { title: "Dashboard", url: "/" },
                { title: "Perfil", url: "/" },
              ]}
            >
              <>
                <Grid
                  item
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Avatar
                    style={{ width: 60, height: 60 }}
                    src={`${userData?.picture ? userData.picture : ""}`}
                  />
                  <Button
                    style={{ height: 30, width: 150 }}
                    variant="contained"
                    component="label"
                  >
                    Editar Foto
                  <input type='file' accept="image/*" hidden/>  
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid item style={{ flexDirection: "column" }}>
                    <Typography>EMAIL:</Typography>
                    <Typography>
                      {userData?.email ? userData.email : ""}
                    </Typography>
                  </Grid>
                  <Button
                    onClick={handleEditEmail}
                    style={{ height: 30, width: 150 }}
                    variant="contained"
                  >
                    Editar Email
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: 20,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Grid item style={{ flexDirection: "column" }}>
                    <Typography>SENHA:</Typography>
                    <Typography>***********</Typography>
                  </Grid>
                  <Button
                    onClick={handleEditPassword}
                    style={{ height: 30, width: 150 }}
                    variant="contained"
                  >
                    Editar Senha
                  </Button>
                </Grid>
                <Grid
                  item
                  style={{
                    marginTop: 40,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    onClick={handleOpenSignatureDialog}
                    style={{ height: 30, width: 230 }}
                    component="label"
                  >
                    Anexar Assinatura Digital
                    <input type="file" hidden/>
                  </Button>
                </Grid>
                {/* <DigitalSignature
                  title="Anexar Assinatura Digital"
                  state={openSignatureDialog}
                  setState={setOpenSignatureDialog}
                /> */}
                <EditUserEmailDialog
                  state={openEditEmailDialog}
                  setState={setOpenEditEmailDialog}
                  title="Editar Email"
                />
                <EditUserPasswordDialog
                  state={openEditPasswordDialog}
                  setState={setOpenEditPasswordDialog}
                  user="tuliomarco9704@hotmail.com"
                  title="Editar Senha"
                />
              </>
            </Heading>
          </Paper>
        </Grid>
      </DashboardContentContainer>
    </DashboardContainer>
  );
}
