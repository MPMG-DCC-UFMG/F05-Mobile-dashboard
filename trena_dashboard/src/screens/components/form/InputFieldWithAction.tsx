import {InputFieldProps} from "./InputField";
import React from "react";

interface InputFieldWithActionProps extends InputFieldProps {
    inputActionText: string,
    onActionClicked?: () => void
}

export const InputFieldWithAction: React.FC<InputFieldWithActionProps> = (props) => {

    const {inputLabel, inputHint, inputKey, inputDefaultValue, inputActionText} = props

    const handleOnValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onValueChanged) {
            props.onValueChanged(event.currentTarget.value, inputKey)
        }
    }

    return (
        <div className="field">
            <label className="label">{inputLabel}</label>
            <div className="field has-addons">
                <div className="control is-expanded">
                    <input className="input" type="text" placeholder={inputHint} onChange={handleOnValueChanged}
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