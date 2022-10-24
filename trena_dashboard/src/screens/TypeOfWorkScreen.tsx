import React from "react";
import { DashboardContentContainer } from "../components/containers/ContentContainer";
import { DashboardContainer } from "../components/containers/DashboardContainer";
import { ListTypeWork } from "../components/lists/ListTypeWork";
import { useStores } from "../core/contexts/UseStores";
import { TypePhotoBox } from "./views/typePhoto/TypePhotoBox";
import { WorkStatusBox } from "./views/workStatus/WorkStatusBox";

export const TypeOfWorkScreen: React.FC<any> = (props) => {
  const { typeWorkStore } = useStores();
  typeWorkStore.loadTypeWorkList();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <div className="columns">
          <div className="column is-one-third">
            <ListTypeWork />
          </div>
          <div className="column">
            <TypePhotoBox />
            <WorkStatusBox />
          </div>
        </div>
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
