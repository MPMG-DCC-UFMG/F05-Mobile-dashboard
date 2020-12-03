import React from "react";
import {useStores} from "../../core/contexts/UseStores";
import {ItemQueue} from "./items/ItemQueue";
import {observer} from "mobx-react";
import {AcceptView} from "../../screens/views/queue/AcceptView";

export const ListQueue: React.FC<any> = observer((props) => {

    const {queueStore} = useStores()

    return (
        <>
            {queueStore.selectedQueueItem ? <AcceptView queueItem={queueStore.selectedQueueItem}/> :
                <div className="panel">
                    {queueStore.queueItemList.map(queueItem => {
                            return <ItemQueue
                                key={queueItem.public_work.id}
                                queueItem={queueItem}
                            />
                        }
                    )}
                </div>}
        </>

    )
})