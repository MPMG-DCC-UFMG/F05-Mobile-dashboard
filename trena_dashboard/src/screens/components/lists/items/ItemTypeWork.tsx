import {TypeWork} from "../../../../core/models/TypeWork";
import React from "react";


export const ItemTypeWork: React.FC<TypeWork> = (props) => {
    return (
        <a href="# " className="panel-block" key={props.flag}>
            {props.name}
        </a>
    )
}