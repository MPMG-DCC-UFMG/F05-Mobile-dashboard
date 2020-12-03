import {BaseCRUDView} from "../../../components/base/BaseCRUDView";
import {Address} from "../../../core/models/Address";
import React from "react";
import {InputField} from "../../../components/form/InputField";
import {InputFieldWithAction} from "../../../components/form/InputFieldWithAction";
import {LocationService} from "../../../core/network/services/LocationService";

interface AddressCRUDViewProps {
    defaultAddress?: AddressCRUDViewState,
    onChangeAddress?: (address: Address) => void
}

const initialState = {
    id: "",
    street: "",
    neighborhood: "",
    number: 0,
    latitude: 0.0,
    longitude: 0.0,
    city: "",
    state: "MG",
    cep: "",
    public_work_id: ""
}

type AddressCRUDViewState = typeof initialState | Address

export default class AddressCRUDView extends BaseCRUDView<AddressCRUDViewProps, AddressCRUDViewState> {

    readonly state: AddressCRUDViewState = initialState

    constructor(props: AddressCRUDViewProps) {
        super(props);

        if (props.defaultAddress) {
            this.state = props.defaultAddress
        }
    }

    isValid(): boolean {
        return true;
    }

    onChange(value: AddressCRUDViewState): void {
        if (this.props.onChangeAddress) {
            this.props.onChangeAddress(value as Address)
        }
    }

    handleOnCEPClicked = async () => {
        try {
            const response = await LocationService.queryCEPTrena(this.state.cep)
            this.setState(prevState => {
                let newState = {...prevState, ...response}
                return newState
            })
            console.log(response)
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <>
                <InputFieldWithAction inputLabel="CEP"
                                      inputHint="CEP da obra ..."
                                      inputDefaultValue={this.state.cep}
                                      inputName="cep"
                                      onValueChanged={this.handleFormChange}
                                      inputActionText="Buscar"
                                      onActionClicked={this.handleOnCEPClicked}/>
                <InputField inputLabel="Rua"
                            inputHint="Rua da obra ..."
                            inputDefaultValue={this.state.street}
                            inputName="street"
                            onValueChanged={this.handleFormChange}/>
                <InputField inputLabel="Número"
                            inputHint="Número da obra ..."
                            inputDefaultValue={this.state.number}
                            inputName="number"
                            onValueChanged={this.handleFormChange}/>
                <InputField inputLabel="Bairro"
                            inputHint="Bairro da obra ..."
                            inputDefaultValue={this.state.neighborhood}
                            inputName="neighborhood"
                            onValueChanged={this.handleFormChange}/>
                <InputField inputLabel="Cidade"
                            inputHint="Cidade da obra ..."
                            inputDefaultValue={this.state.city}
                            inputName="city"
                            onValueChanged={this.handleFormChange}/>


            </>
        )
    }


}