import React from "react";
import {StepItem} from "./items/StepItem";

interface StepsProps {
    stepsList: string[],
    currentStep: number
}

export const Steps: React.FC<StepsProps> = (props) => {
    const {stepsList, currentStep} = props
    return (
        <div className="container is-fullwidth">
            <ul className="steps is-narrow is-medium is-centered has-content-centered">
                {stepsList.map((value, index) => {
                    return <StepItem key={index} title={value} isActive={index === currentStep}/>
                    })
                }
            </ul>
        </div>
    )
}