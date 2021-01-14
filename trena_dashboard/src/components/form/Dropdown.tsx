import React, {useEffect, useState} from "react";

interface DropdownProps {
    inputLabel: string,
    optionsList: DropdownOptions[],
    inputKey?: string,
    inputDefaultValue?: string,
    onValueChanged?: (value: string, key?: string) => void,
}

export interface DropdownOptions {
    key: string,
    value: string
}

export const Dropdown: React.FC<DropdownProps> = (props) => {
    const {inputLabel, optionsList, inputKey, inputDefaultValue} = props
    const defaultValue = optionsList.find(element => element.key === inputDefaultValue)
    const [selectedValue, setSelectedValue] = useState(defaultValue)
    console.log("Selected Value",selectedValue)
    console.log("Default Value",defaultValue)

    useEffect(() => {
        setSelectedValue({
            key: defaultValue?.key ?? optionsList[0].key,
            value: defaultValue?.value ?? optionsList[0].value
        });
    }, [defaultValue])

    const handleOnValueChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const elementFlag = optionsList.find(element => element.value === event.currentTarget.value)
        if(elementFlag){
            setSelectedValue(elementFlag)
            if(props.onValueChanged){
                props.onValueChanged(elementFlag.key, inputKey)
            }
        }
    }

    return (
        <div className="field is-fullwidth">
            <label className="label">{inputLabel}</label>
            <div className="control is-expanded">
                <div className="select">
                    <select onChange={handleOnValueChanged} value={selectedValue?.value}>
                        {optionsList.map(options => {
                            return <option key={options.key}>{options.value}</option>
                        })}
                    </select>
                </div>
            </div>
        </div>
    )
}