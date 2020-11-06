import {BaseCRUDView} from "../../components/base/BaseCRUDView";
import React from "react";
import {MultipleSelector} from "../../components/form/MultipleSelector";

interface WorkStatusSelectProps {
    options: string[]
    onChangeSelectedOptions?: (selectedOptions: number[]) => void
    defaultSelected?: number[]
}

const initialState = {
    selectedOptions: new Set<string>()
}

type WorkStatusSelectState = typeof initialState

export default class WorkStatusSelect extends BaseCRUDView<WorkStatusSelectProps, WorkStatusSelectState> {

    constructor(props: WorkStatusSelectProps) {
        super(props);

        if (props.defaultSelected) {
            this.state = {selectedOptions: new Set<string>(props.defaultSelected.map(value => value.toString()))}
        }
    }

    isValid(): boolean {
        let valid = true
        Object.values(this.state).forEach(value => {
            if (!value) {
                valid = false
            }
        })
        return valid
    }

    handleWorkChange = (selected: Set<string>) => {
        if (this.props.onChangeSelectedOptions) {
            let mArray = Array.from(selected).map(value => value as unknown as number)
            this.props.onChangeSelectedOptions(mArray)
        }
    }

    onChange = (value: WorkStatusSelectState) => {

    }

    render() {
        return (
            <div className="container has-text-left">
                <MultipleSelector options={this.props.options} selected={this.state.selectedOptions}
                                  onSelectionChanged={this.handleWorkChange}/>
            </div>
        )
    }
}