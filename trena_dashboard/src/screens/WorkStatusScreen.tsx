import React from "react";
import { DashboardContentContainer } from "../components/containers/ContentContainer";
import { DashboardContainer } from "../components/containers/DashboardContainer";
import { ListWorkStatus } from "../components/lists/ListWorkStatus";

export const WorkStatusScreen: React.FC<any> = (props) => {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ListWorkStatus />
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

