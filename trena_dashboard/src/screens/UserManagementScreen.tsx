import { Grid } from "@mui/material";
import { observer } from "mobx-react";
import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListUser } from "../components/lists/ListUser";
import { useStores } from "../core/contexts/UseStores";

export const UserManagementScreen: React.FC<any> = observer(() => {
  const { userStore } = useStores();
  userStore.loadUsers();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
          <ListUser />
      </DashboardContentContainer>
    </DashboardContainer>
  );
});
