import React from "react";
import {ListWorkStatus} from "../components/lists/ListWorkStatus";

export const WorkStatusScreen: React.FC<any> = (props) => {
    return (
        <div className="columns">
            <div className="column is-two-thirds">
                <ListWorkStatus/>
            </div>
            <div className="column">
            </div>
        </div>
    )
}