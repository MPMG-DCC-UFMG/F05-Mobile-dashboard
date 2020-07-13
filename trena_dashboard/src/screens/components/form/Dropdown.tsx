import React from "react";

interface DropdownProps {
    inputLabel: string,
    optionsList: DropdownOptions[],
    inputKey?: string,
    inputDefaultValue?: number,
    onValueChanged?: (value: string, key?: string) => void,
}

export interface DropdownOptions {
    key: string,
    value: string
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
    const {inputLabel, optionsList, inputKey, inputDefaultValue} = props

    const defaultValue = optionsList.find(element => element.key === inputDefaultValue?.toString())

    const handleOnValueChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const elementFlag = optionsList.find(element => element.value === event.currentTarget.value)
        if (props.onValueChanged && elementFlag) {
            props.onValueChanged(elementFlag.key, inputKey)
        }
    }

    return (
        <div className="field is-fullwidth">
            <label className="label">{inputLabel}</label>
            <div className="control is-expanded">
                <div className="select">
                    <select onChange={handleOnValueChanged} defaultValue={defaultValue?.value}>
                        {optionsList.map(options => {
                            return <option key={options.key}>{options.value}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}