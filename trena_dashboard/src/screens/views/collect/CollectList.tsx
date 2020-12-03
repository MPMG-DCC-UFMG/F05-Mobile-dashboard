import React from "react";
import {Collect} from "../../../core/models/Collect";
import {ItemCollect} from "../../../components/lists/items/ItemCollect";

interface CollectViewProps {
    collects: Collect[],
    onCollectClicked?: (collect: Collect) => void
    selectedId?: string
}

export const CollectList: React.FC<CollectViewProps> = (props) => {

    const {collects, onCollectClicked, selectedId} = props

    return (
        <table className="table is-fullwidth is-hoverable">
            <thead>
            <tr>
                <th>ID da coleta</th>
                <th>Data da coleta</th>
                <th>Estado da obra</th>
                <th>Quantidade de fotos</th>
                <th>Comentário</th>
            </tr>
            </thead>
            <tbody>
            {collects.map(collect => {
                return <ItemCollect key={collect.id}
                                    collect={collect}
                                    onClick={onCollectClicked}
                                    selectedId={selectedId}/>
            })}
            </tbody>
        </table>
    )
}