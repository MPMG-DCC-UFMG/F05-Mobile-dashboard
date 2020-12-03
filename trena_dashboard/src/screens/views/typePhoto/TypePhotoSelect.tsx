import {BaseCRUDView} from "../../../components/base/BaseCRUDView";
import {MultipleSelector} from "../../../components/form/MultipleSelector";
import React from "react";

interface TypePhotoSelectProps {
    options: string[]
    onChangeSelectedOptions?: (selectedOptions: number[]) => void
    defaultSelected?: number[]
}

const initialState = {
    selectedOptions: new Set<string>()
}

type TypePhotoSelectState = typeof initialState

export default class TypePhotoSelect extends BaseCRUDView<TypePhotoSelectProps, TypePhotoSelectState>{

    constructor(props: TypePhotoSelectProps) {
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

    onChange = (value: TypePhotoSelectState) => {

    }

    render() {
        return(
            <div className="container has-text-left">
                <MultipleSelector options={this.props.options} selected={new Set<string>()} onSelectionChanged={this.handleWorkChange}/>
            </div>
        )
    }
}