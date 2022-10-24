import React from "react";
import { Col, Row } from "reactstrap";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";
import { ListPublicWork } from "../components/lists/ListPublicWork";
import { useStores } from "../core/contexts/UseStores";
import { PublicWorkView } from "./views/publicWork/PublicWorkView";

export const PublicWorkScreen: React.FC = () => {
  const { publicWorkStore, typeWorkStore } = useStores();

  publicWorkStore.loadPublicWorkList();
  typeWorkStore.loadTypeWorkList();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <Col>
          <Row>
            <ListPublicWork />
          </Row>
          <Row>
            <PublicWorkView />
          </Row>
        </Col>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
