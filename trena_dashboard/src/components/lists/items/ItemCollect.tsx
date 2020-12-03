import React from "react";
import {Collect} from "../../../core/models/Collect";
import {useStores} from "../../../core/contexts/UseStores";

interface ItemCollectProps{
    collect: Collect
    onClick?: (collect: Collect)=> void
    selectedId?: string
}

export const ItemCollect: React.FC<ItemCollectProps> = (props) => {

    const {workStatusStore} = useStores()
    const {collect,onClick,selectedId} = props

    const handleClick = () => {
        onClick?.(collect)
    }

    const parseDate = (timestamp: number) : string => {
        const d = new Date(timestamp)
        return d.getDate() + '/' + (d.getMonth()+1) + '/' + d.getFullYear()
    }

    const getWorkStatus = (flag?: number): string =>{
        let workStatusName = "--"
        if(flag){
            const workStatus = workStatusStore.getWorkStatusByFlag(flag)
            workStatusName = workStatus?.name ?? "--"
        }

        return workStatusName
    }

    return (
        <tr className={(selectedId===collect.id ? "is-selected has-background-grey-lighter has-text-black" : "")}
            onClick={handleClick}>
            <td>{collect.id}</td>
            <th>{parseDate(collect.date)}</th>
            <th>
                <span className="tag is-medium is-rounded is-info">{getWorkStatus(collect.public_work_status)}</span>
            </th>
            <th>{collect.photos.length}</th>
            <td>{collect.comments}</td>
        </tr>
    )
}