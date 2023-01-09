import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListCalls } from "../components/lists/ListCalls";

export function CallScreen() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ListCalls />
      </DashboardContentContainer>
    </DashboardContainer>
  );
}
