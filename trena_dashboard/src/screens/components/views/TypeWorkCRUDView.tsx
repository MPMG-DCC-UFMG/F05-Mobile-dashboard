import React from "react";
import {InputField} from "../form/InputField";
import {TypeWork} from "../../../core/models/TypeWork";
import {BaseCRUDView} from "../base/BaseCRUDView";

interface TypeWorkCRUDViewProps {
    defaultTypeWork?: TypeWorkCRUDViewState,
    onChangeTypeWork?: (typeWork: TypeWork) => void
}

const initialState = {
    flag: 0,
    name: ""
}

type TypeWorkCRUDViewState = typeof initialState | TypeWork

export default class TypeWorkCRUDView extends BaseCRUDView<TypeWorkCRUDViewProps, TypeWorkCRUDViewState> {

    readonly state: TypeWorkCRUDViewState = initialState

    constructor(props: TypeWorkCRUDViewProps) {
        super(props);

        if (props.defaultTypeWork) {
            this.state = props.defaultTypeWork
        }
    }

    onChange = (value: TypeWorkCRUDViewState) => {
        if (this.props.onChangeTypeWork) {
            this.props.onChangeTypeWork(value as TypeWork)
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

    render() {
        return (
            <div className="container has-text-left">
                <InputField
                    inputLabel="Tipo de Obra"
                    inputHint="Adicionar novo tipo de obra ..."
                    inputDefaultValue={this.state.name}
                    inputName="name"
                    onValueChanged={this.handleFormChange}/>
            </div>
        )
    }


}