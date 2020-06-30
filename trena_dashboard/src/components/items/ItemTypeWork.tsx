import {TypeWork} from "../../core/models/TypeWork";
import React from "react";

export const ItemTypeWork : React.FC<TypeWork> = (props) =>{
    return(
        <tr key={props.flag}>
            <td>
                {props.name}
            </td>
        </tr>
    )
}