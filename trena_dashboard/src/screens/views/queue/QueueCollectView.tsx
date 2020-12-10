import React from "react";
import {CollectList} from "../collect/CollectList";
import {useStores} from "../../../core/contexts/UseStores";
import {Collect} from "../../../core/models/Collect";
import {observer} from "mobx-react";

export const QueueCollectView: React.FC<any> = observer((props) => {

    const {queueStore} = useStores()

    const onCollectSelected = (collect: Collect) => {
        queueStore.selectCollect(collect)
    }

    return (
        <div className="container is-fullwidth has-text-centered">
            <p className="title"> Selecionar coleta</p>
            <CollectList
                collects={queueStore.collectsOfPublicWork}
                onCollectClicked={onCollectSelected}
                selectedId={queueStore.selectedCollect?.id}
                showPublicWork={false}/>
        </div>
    )
})