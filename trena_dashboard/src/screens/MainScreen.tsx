import { observer } from "mobx-react";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { DashboardContainer } from "../components/containers/DashboardContainer";
import { useStores } from "../core/contexts/UseStores";
import { CollectScreen } from "./CollectScreen";
import { Home } from "./Home";
import { InspectionScreen } from "./InspectionScreen";
import { PublicWorkScreen } from "./PublicWorkScreen";
import { QueueScreen } from "./QueueScreen";
import { TypeOfWorkScreen } from "./TypeOfWorkScreen";
import { TypePhotoScreen } from "./TypePhotoScreen";
import { UserManagementScreen } from "./UserManagementScreen";
import { WorkStatusScreen } from "./WorkStatusScreen";

export const MainScreen = observer(() => {
  const { userStore, workStatusStore, typePhotoStore } = useStores();

  workStatusStore.loadWorkStatus();
  typePhotoStore.loadTypePhotoList();

  if (userStore.loggedUser === undefined) {
    return <Navigate to="/login" />;
  }

  return (
    <DashboardContainer>
      <div className="columns is-fullheight mt-1">
        <div className="column">
          <div className="box is-fullheight mr-2">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/typeOfWork" element={<TypeOfWorkScreen />} />
              <Route path="/typePhoto" element={<TypePhotoScreen />} />
              <Route path="/publicWork" element={<PublicWorkScreen />} />
              <Route path="/workStatus" element={<WorkStatusScreen />} />
              <Route path="/users" element={<UserManagementScreen />} />
              <Route path="/collect" element={<CollectScreen />} />
              <Route path="/queue" element={<QueueScreen />} />
              <Route path="/inspections" element={<InspectionScreen />} />
            </Routes>
          </div>
        </div>
      </div>
    </DashboardContainer>
  );
});

