import React from "react";
import { HomeCards } from "../components/Cards";
import { DashboardContentContainer } from "../components/containers/ContentContainer";
import { DashboardContainer } from "../components/containers/DashboardContainer";

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

