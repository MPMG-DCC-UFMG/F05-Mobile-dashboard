import React from "react";
import {QueueItem} from "../../../core/models/QueueItem";
import {useStores} from "../../../core/contexts/UseStores";

interface ItemQueueProps {
    queueItem: QueueItem
}

export const ItemQueue: React.FC<ItemQueueProps> = (props) => {

    const {queueItem} = props
    const {queueStore} = useStores()

    const handleClick = () => {
        queueStore.selectQueueItem(queueItem)
    }

    return (
        <a className={"panel-block level"} key={queueItem.public_work.id}
             onClick={handleClick}>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">Novos dados da obra</p>
                    <p className="title">{queueItem.public_work_count>0 ? "Sim" : "Não"}</p>
                </div>
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">Coletas</p>
                    <p className="title">{queueItem.collect_count}</p>
                </div>
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">Fotos</p>
                    <p className="title">{queueItem.photo_count}</p>
                </div>
            </div>
        </a>
    )
}