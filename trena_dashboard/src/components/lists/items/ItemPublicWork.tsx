import {PublicWork} from "../../../core/models/PublicWork";
import React from "react";
import {useStores} from "../../../core/contexts/UseStores";
import {observer} from "mobx-react";

interface ItemPublicWorkProps {
    publicWork: PublicWork
}

export const ItemPublicWork: React.FC<ItemPublicWorkProps> = observer((props) => {
    const {publicWork} = props
    const {publicWorkStore} = useStores()

    const isSelected = publicWork.id === publicWorkStore.selectedPublicWork?.id

    const handleClick = () => {
        publicWorkStore.selectPublicWork(publicWork)
    }

    return (
        <a className={"panel-block" + (isSelected ? " has-background-grey-lighter" : "")} key={publicWork.id}
           onClick={handleClick}>
            {publicWork.name}
        </a>
    )
})
