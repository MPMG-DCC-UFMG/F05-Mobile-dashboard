import {TypeWork} from "../../../core/models/TypeWork";
import React from "react";
import {useStores} from "../../../core/contexts/UseStores";
import {observer} from "mobx-react";

interface ItemTypeWorkProps {
    typeWork: TypeWork
}

export const ItemTypeWork: React.FC<ItemTypeWorkProps> = observer((props) => {
    const {typeWork} = props
    const {typeWorkStore} = useStores()

    const isSelected = typeWork.flag === typeWorkStore.selectedTypeWork?.flag

    const handleClick = () => {
        typeWorkStore.selectTypeWork(typeWork)
    }

    return (
        <a className={"panel-block" + (isSelected ? " has-background-grey-lighter" : "")} key={typeWork.flag}
           onClick={handleClick}>
            {typeWork.name}
        </a>
    )
})