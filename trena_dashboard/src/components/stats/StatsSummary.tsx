import React from "react";
import {StatsItem} from "./StatsItem";
import {observer} from "mobx-react";
import {useStores} from "../../core/stores/UseStores";

export const StatsSummary: React.FC<any> = observer(() => {

    const {statisticsStore} = useStores()

    return (
        <>
            <div className="level">
                <StatsItem title={"Obras Cadastradas"} value={statisticsStore.publicWorkCount + ""}/>
                <StatsItem title={"Coletas do mês"} value={statisticsStore.collectMonthCount + ""}/>
            </div>
        </>
    )
})