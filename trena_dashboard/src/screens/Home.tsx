import React from "react";
import {StatsSummary} from "../components/stats/StatsSummary";
import {useStores} from "../core/contexts/UseStores";

interface HomeProps {
}

export const Home: React.FC<HomeProps> = (props) => {

    const {statisticsStore} = useStores()

    statisticsStore.countMonthCollects()
    statisticsStore.countPublicWork()
    // statisticsStore.countQueue()

    return (
        <div>
            <StatsSummary/>
        </div>
    )
}