import React from "react";
import {StatsSummary} from "../components/stats/StatsSummary";
import {useStores} from "../core/stores/UseStores";

interface HomeProps {
}

export const Home: React.FC<HomeProps> = (props) => {

    const {statisticsStore} = useStores()

    statisticsStore.countMonthCollects()
    statisticsStore.countPublicWork()

    return (
        <div>
            <StatsSummary/>
        </div>
    )
}