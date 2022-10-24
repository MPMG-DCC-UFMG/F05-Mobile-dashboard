import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { CollectScreen } from "../screens/CollectScreen";
import { Home } from "../screens/Home";
import { InspectionScreen } from "../screens/InspectionScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { PublicWorkScreen } from "../screens/PublicWorkScreen";
import { QueueScreen } from "../screens/QueueScreen";
import { TypeOfWorkScreen } from "../screens/TypeOfWorkScreen";
import { TypePhotoScreen } from "../screens/TypePhotoScreen";
import { UserManagementScreen } from "../screens/UserManagementScreen";
import { WorkStatusScreen } from "../screens/WorkStatusScreen";

export function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/typeOfWork" element={<TypeOfWorkScreen />} />
        <Route path="/typePhoto" element={<TypePhotoScreen />} />
        <Route path="/publicWork" element={<PublicWorkScreen />} />
        <Route path="/workStatus" element={<WorkStatusScreen />} />
        <Route path="/users" element={<UserManagementScreen />} />
        <Route path="/collect" element={<CollectScreen />} />
        <Route path="/queue" element={<QueueScreen />} />
        <Route path="/inspections" element={<InspectionScreen />} />
      </Routes>
    </HashRouter>
  );
}
