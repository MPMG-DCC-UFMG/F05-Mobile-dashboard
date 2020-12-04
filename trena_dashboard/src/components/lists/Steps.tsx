import React from "react";
import {StepItem} from "./items/StepItem";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface StepsProps {
    stepsList: string[],
    icons: IconDefinition[],
    currentStep: number
}

export const Steps: React.FC<StepsProps> = (props) => {
    const {stepsList, currentStep,icons} = props
    return (
        <div className="container is-fullwidth">
            <ul className="steps is-narrow is-medium is-centered has-content-centered">
                {stepsList.map((value, index) => {
                    return <StepItem key={index} title={value} isActive={index === currentStep} icon={icons[index]} />
                    })
                }
            </ul>
        </div>
    )
}