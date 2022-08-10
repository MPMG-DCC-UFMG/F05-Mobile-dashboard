import {BaseCRUDView} from "../../../components/base/BaseCRUDView";
import {Inspection} from "../../../core/models/Inspection";
import {InputField} from "../../../components/form/InputField";
import React from "react";
import {InputTextArea} from "../../../components/form/InputTextArea";


interface InspectionCRUDViewProps {
    defaultInspection?: InspectionCRUDViewState,
    onChangeInspection?: (inspection: Inspection) => void
}

const initialState = {
    flag: 0,
    name: "",
    description: "",
    public_work_id: 0
}

type InspectionCRUDViewState = typeof initialState | Inspection

export default class InspectionCRUDView extends BaseCRUDView<InspectionCRUDViewProps, InspectionCRUDViewState> {

    readonly state: InspectionCRUDViewState = initialState

    constructor(props: InspectionCRUDViewProps) {
        super(props);

        if (props.defaultInspection) {
            this.state = props.defaultInspection
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

    onChange = (value: InspectionCRUDViewState) => {
        if (this.props.onChangeInspection) {
            this.props.onChangeInspection(value as Inspection)
        }
    }

    onDescriptionChanged = (value: string) => {
        this.setState(prevState => {
            let newState = {...prevState, description: value}
            this.onChange(newState)
            return newState
        })
    }

    render() {
        return (
            <div className="container has-text-left">
                <InputField
                    inputLabel="Nome Vistoria"
                    inputHint="Nome da Vistoria..."
                    inputDefaultValue={this.state.name}
                    inputName="name"
                    onValueChanged={this.handleFormChange}/>
                <InputTextArea inputLabel="Descrição"
                               inputHint="Descrição da Vistoria"
                               inputDefaultValue={this.state.description}
                               inputName="description"
                               onValueChanged={this.onDescriptionChanged}/>
                <InputField
                    inputLabel="Id Obra Pública"
                    inputHint="Id Obra Pública..."
                    inputDefaultValue={this.state.public_work_id}
                    inputName="public_work_id"
                    onValueChanged={this.handleFormChange}/>
            </div>
        )
    }

}