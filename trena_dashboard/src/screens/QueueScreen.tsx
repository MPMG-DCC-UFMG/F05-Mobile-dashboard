import React from "react";
import {ListQueue} from "../components/lists/ListQueue";
import {useStores} from "../core/contexts/UseStores";

export const QueueScreen: React.FC<any> = (props) => {

    const {queueStore} = useStores()
    queueStore.loadQueueItem()

    return (
        <div>
            <ListQueue/>
        </div>
    )
}