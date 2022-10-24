import { observer } from "mobx-react";
import React from "react";
import { useStores } from "../../core/contexts/UseStores";
import { StatsItem } from "./StatsItem";

export const StatsSummary: React.FC<any> = observer(() => {
  const { statisticsStore } = useStores();

  return (
    <>
      <div className="level">
        <StatsItem
          title={"Obras Cadastradas"}
          value={statisticsStore.publicWorkCount + ""}
        />
        <StatsItem
          title={"Coletas do mês"}
          value={statisticsStore.collectMonthCount + ""}
        />
        <StatsItem
          title={"Dados na fila"}
          value={statisticsStore.queueCount + ""}
        />
      </div>
    </>
  );
});
