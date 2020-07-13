import React from "react";

export interface InputFieldProps {
    inputLabel: string,
    inputHint?: string,
    inputKey?: string,
    inputDefaultValue?: string,
    onValueChanged?: (value: string, key?: string) => void,
}

export const InputField: React.FC<InputFieldProps> = (props) => {
    const {inputLabel, inputHint, inputKey, inputDefaultValue} = props

    const handleOnValueChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onValueChanged) {
            props.onValueChanged(event.currentTarget.value, inputKey)
        }
    }

    return (
        <div className="field">
            <label className="label">{inputLabel}</label>
            <div className="control">
                <input className="input" type="text" placeholder={inputHint} onChange={handleOnValueChanged}
                       defaultValue={inputDefaultValue}/>
            </div>
        </div>
    )
}