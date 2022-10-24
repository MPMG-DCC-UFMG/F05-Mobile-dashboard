import React from "react";
import { DashboardContentContainer } from "../components/containers/ContentContainer";
import { DashboardContainer } from "../components/containers/DashboardContainer";
import { ListWorkStatus } from "../components/lists/ListWorkStatus";

export const WorkStatusScreen: React.FC<any> = (props) => {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <div className="columns">
          <div className="column is-two-thirds">
            <ListWorkStatus />
          </div>
          <div className="column"></div>
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
