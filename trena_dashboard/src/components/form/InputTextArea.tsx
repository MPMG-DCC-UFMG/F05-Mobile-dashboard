import React from "react";

export interface InputTextAreaProps {
    inputLabel: string,
    inputHint?: string,
    inputName?: string,
    inputDefaultValue?: any,
    onValueChanged?: (value: string, name?: string) => void
}

export const InputTextArea: React.FC<InputTextAreaProps> = (props) => {
    const {inputLabel, inputHint, inputName, inputDefaultValue} = props

    const handleOnValueChanged = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (props.onValueChanged) {
            props.onValueChanged(event.target.value, event.target.name)
        }
    }

    return (
        <div className="field">
            <label className="label">{inputLabel}</label>
            <div className="control">
                <textarea className="textarea" name={inputName} placeholder={inputHint} onChange={handleOnValueChanged}
                          defaultValue={inputDefaultValue}/>
            </div>
        </div>
    )
}