import { observer } from "mobx-react";
import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListUser } from "../components/lists/ListUser";
import { useStores } from "../core/contexts/UseStores";
import { UserCRUDView } from "./views/user/UserCRUDView";

export const UserManagementScreen: React.FC<any> = observer(() => {
  const { userStore } = useStores();
  userStore.loadUsers();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <div className="columns">
          <div className="column is-one-third">
            <UserCRUDView initialUser={userStore.selectedUser} />
          </div>
          <div className="column is-two-thirds">
            <ListUser />
          </div>
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
});
