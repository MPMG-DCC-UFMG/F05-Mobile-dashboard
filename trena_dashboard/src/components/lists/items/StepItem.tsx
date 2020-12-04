import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconDefinition} from "@fortawesome/free-solid-svg-icons";

interface StepItemProps {
    title: string,
    isActive: boolean,
    icon?: IconDefinition
}

export const StepItem: React.FC<StepItemProps> = (props) => {
    const {title, isActive, icon} = props
    return (
        <li className={"steps-segment " + (isActive ? "is-active" : " ")}>
          <span className="steps-marker">
              {icon &&
              <span className="icon">
                  <FontAwesomeIcon icon={icon}/>
              </span>
              }

          </span>
            <div className="steps-content">
                <p className="heading">{title}</p>
            </div>
        </li>
    )
}