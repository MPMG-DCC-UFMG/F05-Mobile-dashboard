import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Config from "../config/Config"
import { CollectScreen } from "../screens/CollectScreen"
import { Home } from "../screens/Home"
import { InspectionScreen } from "../screens/InspectionScreen"
import { LoginScreen } from "../screens/LoginScreen"
import { NotificationScreen } from "../screens/NotificationScreen"
import { OAuthScreen } from "../screens/OAuth"
import { PublicWorkQueueScreen } from "../screens/PublicWorkQueueScreen"
import { PublicWorkScreen } from "../screens/PublicWorkScreen"
import { QueueScreen } from "../screens/QueueScreen"
import { TypeOfWorkScreen } from "../screens/TypeOfWorkScreen"
import { TypePhotoScreen } from "../screens/TypePhotoScreen"
import { UserManagementScreen } from "../screens/UserManagementScreen"
import { UserSettingScreen } from "../screens/UserSettingsScreen"
import { WorkStatusScreen } from "../screens/WorkStatusScreen"

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {Config.DEV_WSO2_MODE == "false" ? (
          <Route path="/" element={<LoginScreen />} />
        ) : (
          <Route path="/" element={<OAuthScreen />} />
        )}
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/typeOfWork" element={<TypeOfWorkScreen />} />
        <Route path="/typePhoto" element={<TypePhotoScreen />} />
        <Route path="/publicWork" element={<PublicWorkScreen />} />
        <Route path="/publicWork/queue" element={<PublicWorkQueueScreen />} />
        <Route path="/workStatus" element={<WorkStatusScreen />} />
        <Route path="/users" element={<UserManagementScreen />} />
        <Route path="/queue" element={<QueueScreen />} />
        <Route path="/collect" element={<CollectScreen />} />
        <Route path="/inspections" element={<InspectionScreen />} />
        <Route path="/userSettings" element={<UserSettingScreen />} />
        <Route path="/notifications" element={<NotificationScreen />} />
      </Routes>
    </BrowserRouter>
  )
}
