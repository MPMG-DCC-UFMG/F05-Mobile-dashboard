import { observer } from "mobx-react";
import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListUser } from "../components/lists/ListUser";

export const UserManagementScreen: React.FC<any> = observer(() => {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ListUser />
      </DashboardContentContainer>
    </DashboardContainer>
  );
});

