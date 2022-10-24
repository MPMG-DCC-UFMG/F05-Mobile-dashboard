import React from "react";
import { DashboardContentContainer } from "../components/containers/ContentContainer";
import { DashboardContainer } from "../components/containers/DashboardContainer";
import { StatsSummary } from "../components/stats/StatsSummary";
import { useStores } from "../core/contexts/UseStores";

interface HomeProps {}

export const Home: React.FC<HomeProps> = (props) => {
  const { statisticsStore } = useStores();

  statisticsStore.countMonthCollects();
  statisticsStore.countPublicWork();
  // statisticsStore.countQueue()

  return (
    <DashboardContainer>
      <DashboardContentContainer>
        <StatsSummary />
      </DashboardContentContainer>
    </DashboardContainer>
  );
};
