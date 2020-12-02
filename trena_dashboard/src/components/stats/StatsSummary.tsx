import React from "react";
import {StatsItem} from "./StatsItem";
import {observer} from "mobx-react";
import {useStores} from "../../core/contexts/UseStores";

export const StatsSummary: React.FC<any> = observer(() => {

    const {statisticsStore} = useStores()

    return (
        <>
            <div className="level">
                <StatsItem title={"Obras Cadastradas"} value={statisticsStore.publicWorkCount + ""}/>
                <StatsItem title={"Coletas do mês"} value={statisticsStore.collectMonthCount + ""}/>
                <StatsItem title={"Dados na fila"} value={statisticsStore.queueCount + ""}/>
            </div>
        </>
    )
})