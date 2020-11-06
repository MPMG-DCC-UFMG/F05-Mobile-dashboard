import {BaseCRUDView} from "../../components/base/BaseCRUDView";
import {MultipleSelector} from "../../components/form/MultipleSelector";
import React from "react";

interface TypePhotoSelectProps {
    options: string[]
    onChangeSelectedOptions?: (selectedOptions: number[]) => void
}

const initialState = {
    selectedOptions: []
}

type TypePhotoSelectState = typeof initialState

export default class TypePhotoSelect extends BaseCRUDView<TypePhotoSelectProps, TypePhotoSelectState>{

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
            this.props.onChangeSelectedOptions([selected.values()].map(value => {
                return value as unknown as number;
            }))
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