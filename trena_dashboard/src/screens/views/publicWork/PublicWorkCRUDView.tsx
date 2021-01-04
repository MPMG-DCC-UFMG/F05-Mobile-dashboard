import {BaseCRUDView} from "../../../components/base/BaseCRUDView";
import {PublicWork} from "../../../core/models/PublicWork";
import {InputField} from "../../../components/form/InputField";
import React from "react";
import {Dropdown, DropdownOptions} from "../../../components/form/Dropdown";
import {Address} from "../../../core/models/Address";
import AddressCRUDView from "./AddressCRUDView";


interface PublicWorkCRUDViewProps {
    defaultPublicWork?: PublicWorkCRUDViewState,
    onChangePublicWork?: (publicWork: PublicWork) => void
    typeOfWorkList: DropdownOptions[]
}

const initialState = {
    id: "",
    name: "",
    type_work_flag: 0,
    address: {} as Address
}

type PublicWorkCRUDViewState = typeof initialState | PublicWork

export default class PublicWorkCRUDView extends BaseCRUDView<PublicWorkCRUDViewProps, PublicWorkCRUDViewState> {

    readonly state: PublicWorkCRUDViewState = initialState

    constructor(props: PublicWorkCRUDViewProps) {
        super(props);

        if (props.defaultPublicWork) {
            this.state = props.defaultPublicWork
        } else {
            this.state.type_work_flag = Number(props.typeOfWorkList[0].key)
        }
    }

    isValid(): boolean {
        return true;
    }

    onChange(value: PublicWorkCRUDViewState) {
        if (this.props.onChangePublicWork) {
            this.props.onChangePublicWork(value as PublicWork)
        }
    }

    onAddressChanged = (value: Address) => {
        this.state.address = value
        if (this.props.onChangePublicWork) {
            this.props.onChangePublicWork(this.state)
        }
    }

    onTypeWorkSelected = (value: string) => {
        this.setState(prevState => {
            let newState = {...prevState, type_work_flag: Number(value)}
            this.onChange(newState)
            return newState
        })
    }

    render() {
        const {typeOfWorkList} = this.props
        return (
            <div className="container has-text-left">
                <InputField
                    inputLabel="Nome"
                    inputHint="Nome da obra ..."
                    inputDefaultValue={this.state.name}
                    inputName="name"
                    onValueChanged={this.handleFormChange}/>
                <Dropdown inputLabel="Tipo de Obra"
                          optionsList={typeOfWorkList}
                          inputDefaultValue={this.state.type_work_flag.toString()}
                          onValueChanged={this.onTypeWorkSelected}/>
                <AddressCRUDView
                    defaultAddress={this.state.address}
                    onChangeAddress={this.onAddressChanged}/>
            </div>
        )
    }


}