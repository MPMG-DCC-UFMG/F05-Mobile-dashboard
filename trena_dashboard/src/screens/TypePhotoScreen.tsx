import React from "react";
import { DashboardContentContainer } from "../components/containers/ContentContainer";
import { DashboardContainer } from "../components/containers/DashboardContainer";
import { ListTypePhoto } from "../components/lists/ListTypePhoto";
import { useStores } from "../core/contexts/UseStores";

export const TypePhotoScreen: React.FC<any> = (props) => {
  const { typePhotoStore } = useStores();
  typePhotoStore.loadTypePhotoList();

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <ListTypePhoto />
      </DashboardContentContainer>
    </DashboardContainer>
  );
};

