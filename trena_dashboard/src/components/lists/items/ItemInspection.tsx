import {Inspection} from "../../../core/models/Inspection";
import {observer} from "mobx-react";
import React from "react";
import {useStores} from "../../../core/contexts/UseStores";

interface ItemInspectionProps {
    inspection:Inspection
}

export const ItemInspection: React.FC<ItemInspectionProps> = observer((props) => {
    const {inspection} = props
    const {inspectionStore} = useStores()

    const isSelected = inspection.flag === inspectionStore.selectedInspection?.flag

    const handleClick = () => {
        inspectionStore.selectInspection(inspection)
    }

    const renderSwitch = (status?:string)  => {
        switch(status) {
        case "0":
            return 'Nova';
        case "1":
            return 'Pendente'
        case "2":
            return 'Verificada';
        case "3":
            return 'Negada';        
        default:
            return  '--';
        }
      }

    return (
        <tr className={(isSelected ? "is-selected has-background-grey-lighter has-text-black" : "")} onClick={handleClick}>
            <td>
                {inspection.name}
            </td>
            <td>
                {inspection.description}
            </td>
            <td>
                {inspection.public_work_id}
            </td>
            <td>
                {renderSwitch(inspection.status?.toString())}
            </td>
        </tr>
    )
})