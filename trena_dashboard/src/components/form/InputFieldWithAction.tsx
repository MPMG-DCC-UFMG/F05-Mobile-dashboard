import {InputFieldProps} from "./InputField";
import React from "react";

interface InputFieldWithActionProps extends InputFieldProps {
    inputActionText: string,
    onActionClicked?: () => void
}

export const InputFieldWithAction: React.FC<InputFieldWithActionProps> = (props) => {

    const {inputLabel, inputHint, inputName, inputDefaultValue, inputActionText, onValueChanged} = props

    return (
        <div className="field">
            <label className="label">{inputLabel}</label>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input className="input" type="text"
                           placeholder={inputHint}
                           name={inputName}
                           onChange={onValueChanged}
                           defaultValue={inputDefaultValue}/>
                </div>
                <div className="control">
                    <button className="button is-info" onClick={props.onActionClicked}>
                        {inputActionText}
                    </button>
                </div>
            </div>
        </div>
    )
}