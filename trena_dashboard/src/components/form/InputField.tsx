import React from "react";

export interface InputFieldProps {
    inputLabel: string,
    inputHint?: string,
    inputName?: string,
    inputDefaultValue?: any,
    onValueChanged?: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

export const InputField: React.FC<InputFieldProps> = (props) => {
    const {inputLabel, inputHint, inputName, inputDefaultValue, onValueChanged} = props


    return (
        <div className="field">
            <label className="label">{inputLabel}</label>
            <div className="control">
                <input className="input" type="text" name={inputName} placeholder={inputHint} onChange={onValueChanged}
                       defaultValue={inputDefaultValue}/>
            </div>
        </div>
    )
}