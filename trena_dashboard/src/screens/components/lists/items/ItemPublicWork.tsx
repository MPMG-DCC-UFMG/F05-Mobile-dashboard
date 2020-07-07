import {PublicWork} from "../../../../core/models/PublicWork";
import React from "react";
import {useStores} from "../../../../core/stores/UseStores";

interface ItemPublicWorkProps {
    publicWork: PublicWork
}

export const ItemPublicWork: React.FC<ItemPublicWorkProps> = (props => {
    const {publicWork} = props
    const {publicWorkStore} = useStores()

    const handleClick = () => {
        publicWorkStore.selectPublicWork(publicWork)
    }

    return (
        <a href="# " className="panel-block" key={publicWork.id} onClick={handleClick}>
            {publicWork.name}
        </a>
    )
})