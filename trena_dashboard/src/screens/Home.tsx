import React from "react";
import { HomeCards } from "../components/Cards";
import { DashboardContentContainer } from "../components/Containers/ContentContainer";
import { DashboardContainer } from "../components/Containers/DashboardContainer";

interface HomeProps {}

export const Home: React.FC<HomeProps> = () => {
  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <HomeCards />
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
