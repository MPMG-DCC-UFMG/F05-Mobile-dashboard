import React from "react";
import { Col, Row } from "reactstrap";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListPublicWork } from "../components/lists/ListPublicWork";

export const PublicWorkScreen: React.FC = () => {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
            <ListPublicWork />
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
