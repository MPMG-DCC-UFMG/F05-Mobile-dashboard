import {observer} from "mobx-react";
import {WorkStatus} from "../../../core/models/WorkStatus";
import {useStores} from "../../../core/contexts/UseStores";
import React from "react";

interface ItemWorkStatusProps {
    workStatus: WorkStatus
}

export const ItemWorkStatus: React.FC<ItemWorkStatusProps> = observer( (props) =>{
    const {workStatus} = props
    const {workStatusStore} = useStores()

    const isSelected = workStatus.flag === workStatusStore.selectedWorkStatus?.flag

    const handleClick = () => {
        workStatusStore.selectWorkStatus(workStatus)
    }
    return (
        <tr className={(isSelected ? "is-selected has-background-grey-lighter has-text-black" : "")} onClick={handleClick}>
            <td>
                {workStatus.name}
            </td>
            <td>
                {workStatus.description}
            </td>
        </tr>
    )
})