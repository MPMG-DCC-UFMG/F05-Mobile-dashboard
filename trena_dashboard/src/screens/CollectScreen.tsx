import React from "react";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListCitizenCollects } from "../components/lists/ListCitizenCollects";

export function CollectScreen() {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ListCitizenCollects />
      </DashboardContentContainer>
    </DashboardContainer>
  );
}
