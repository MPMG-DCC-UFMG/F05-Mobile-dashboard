import React from "react";

interface StepItemProps {
    title: string,
    isActive: boolean
}

export const StepItem: React.FC<StepItemProps> = (props) => {
    const {title, isActive} = props
    return (
        <li className={"steps-segment " + (isActive ? "is-active" : " ")}>
          <span className={"steps-marker"}>
          </span>
            <div className="steps-content">
                <p className="heading">{title}</p>
            </div>
        </li>
    )
}