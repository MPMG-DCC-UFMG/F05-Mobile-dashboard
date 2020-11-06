import React, {useState} from "react";


interface MultipleSelectorProps {
    options: string[]
    selected: Set<string>
    onSelectionChanged?: (selected: Set<string>) => void
}

export const MultipleSelector: React.FC<MultipleSelectorProps> = (props) => {

    const {options, selected, onSelectionChanged} = props
    const [state, setState] = useState({selected: selected})

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = event.target.name
        const currSelected = toggleIndex(index)
        if (onSelectionChanged) {
            onSelectionChanged(currSelected)
        }
        setState((prevState) => {
            return {...prevState, selected: currSelected}
        })
    }

    const toggleIndex = (index: string): Set<string> => {
        let currSelected = new Set(state.selected)
        if (currSelected.has(index)) {
            currSelected.delete(index)
        } else {
            currSelected.add(index)
        }
        return currSelected
    }


    return (
        <div>
            {options.map((option, index) => {
                    return (
                        <div className="block" key={index}>
                            <label className="checkbox">
                                <input type="checkbox" name={index.toString()}
                                       checked={state.selected.has(index.toString())}
                                       onChange={handleChange}/>
                                {" " + option}
                            </label>
                        </div>

                    )
                }
            )}
        </div>
    )
}