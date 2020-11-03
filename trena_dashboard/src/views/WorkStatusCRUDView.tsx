import React from "react";
import {BaseCRUDView} from "../components/base/BaseCRUDView";
import {InputField} from "../components/form/InputField";
import {InputTextArea} from "../components/form/InputTextArea";
import {WorkStatus} from "../core/models/WorkStatus";


interface WorkStatusCRUDViewProps {
    defaultWorkStatus?: WorkStatusCRUDViewState,
    onChangeWorkStatus?: (workStatus: WorkStatus) => void
}

const initialState = {
    flag: 0,
    name: "",
    description: ""
}

type WorkStatusCRUDViewState = typeof initialState | WorkStatus

export default class WorkStatusCRUDView extends BaseCRUDView<WorkStatusCRUDViewProps, WorkStatusCRUDViewState> {

    readonly state: WorkStatusCRUDViewState = initialState

    constructor(props: WorkStatusCRUDViewProps) {
        super(props);

        if (props.defaultWorkStatus) {
            this.state = props.defaultWorkStatus
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

    onChange = (value: WorkStatusCRUDViewState) => {
        if (this.props.onChangeWorkStatus) {
            this.props.onChangeWorkStatus(value as WorkStatus)
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
                    inputLabel="Estado da obra"
                    inputHint="Adicionar novo estado da obra ..."
                    inputDefaultValue={this.state.name}
                    inputName="name"
                    onValueChanged={this.handleFormChange}/>
                <InputTextArea inputLabel="Descrição"
                               inputHint="Descrição do estado da obra"
                               inputDefaultValue={this.state.description}
                               inputName="description"
                               onValueChanged={this.onDescriptionChanged}/>
            </div>
        )
    }

}