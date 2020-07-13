import React from "react";
import {InputField} from "../form/InputField";
import {PublicWork} from "../../../core/models/PublicWork";
import {Dropdown, DropdownOptions} from "../form/Dropdown";
import {Address} from "../../../core/models/Address";
import {InputFieldWithAction} from "../form/InputFieldWithAction";
import {LocationService} from "../../../core/services/LocationService";

interface PublicWorkCRUDViewProps {
    defaultPublicWork?: PublicWork,
    typeOfWorkList: DropdownOptions[],
    onChangePublicWork?: (publicWork: PublicWork) => void
}

interface PublicWorkCRUDViewStat {
    publicWork: PublicWork
}

export default class PublicWorkCRUDView extends React.Component<PublicWorkCRUDViewProps, PublicWorkCRUDViewStat> {

    constructor(props: PublicWorkCRUDViewProps) {
        super(props);
        console.log(props.defaultPublicWork)
        const _publicWork: PublicWork = props.defaultPublicWork ? props.defaultPublicWork : this.createNewPublicWork(props.typeOfWorkList)
        this.state = {
            publicWork: _publicWork
        }
    }

    createNewPublicWork = (typeWorkList: DropdownOptions[]): PublicWork => {
        return {type_work_flag: Number(typeWorkList[0].key), address: {} as Address} as PublicWork;
    }

    updateValue = (key: string, value: any) => {
        const {publicWork} = this.state
        switch (key) {
            case "name":
                publicWork.name = value
                break;
            case "type_work_flag":
                publicWork.type_work_flag = Number(value)
                break;
            case "street":
                publicWork.address.street = value
                break;
            case "number":
                publicWork.address.number = value
                break;
            case "neighborhood":
                publicWork.address.neighborhood = value
                break;
            case "city":
                publicWork.address.city = value
                break;
            case "cep":
                publicWork.address.cep = value
                break;
            case "state":
                publicWork.address.state = value
                break;
        }
        this.setState((current) => ({...current, publicWork: publicWork}))
    }

    handleFormChange = (value: string, key?: string) => {
        if (key) {
            this.updateValue(key, value);
            if (this.props.onChangePublicWork) {
                this.props.onChangePublicWork(this.state.publicWork)
            }
        }
    }

    handleOnCEPClicked = async () => {
        const mPublicWork = this.state.publicWork
        if (mPublicWork.address.cep) {
            LocationService.queryCEP(mPublicWork.address.cep).then((res => {
                if (res.status === 200) {
                    mPublicWork.address.street = res.body["logradouro"]
                    mPublicWork.address.neighborhood = res.body["bairro"]
                    mPublicWork.address.city = res.body["localidade"]
                    mPublicWork.address.state = res.body["uf"]
                    this.setState((current) => ({...current, publicWork: mPublicWork}))
                }
            }))
        }
    }


    render() {
        const {typeOfWorkList} = this.props
        const defaultPublicWork = this.state.publicWork
        return (
            <div className="container has-text-left">
                <InputField inputLabel="Nome"
                            inputHint="Nome da obra ..."
                            inputDefaultValue={defaultPublicWork?.name}
                            inputKey="name"
                            onValueChanged={this.handleFormChange}/>
                <Dropdown inputLabel="Tipo da Obra"
                          optionsList={typeOfWorkList}
                          inputKey="type_work_flag"
                          inputDefaultValue={defaultPublicWork?.type_work_flag}
                          onValueChanged={this.handleFormChange}/>
                <InputField inputLabel="Rua"
                            inputHint="Rua da obra"
                            inputDefaultValue={defaultPublicWork?.address.street}
                            inputKey="street"
                            onValueChanged={this.handleFormChange}/>
                <InputField inputLabel="Número"
                            inputHint="Número"
                            inputDefaultValue={defaultPublicWork?.address.number}
                            inputKey="number"
                            onValueChanged={this.handleFormChange}/>
                <InputField inputLabel="Bairro"
                            inputHint="Bairro"
                            inputDefaultValue={defaultPublicWork?.address.neighborhood}
                            inputKey="neighborhood"
                            onValueChanged={this.handleFormChange}/>
                <InputFieldWithAction inputLabel="CEP"
                                      inputHint="CEP"
                                      inputDefaultValue={defaultPublicWork?.address.cep}
                                      inputKey="cep"
                                      inputActionText="Buscar"
                                      onActionClicked={this.handleOnCEPClicked}
                                      onValueChanged={this.handleFormChange}/>
                <InputField inputLabel="Cidade"
                            inputHint="Cidade"
                            inputDefaultValue={defaultPublicWork?.address.city}
                            inputKey="city"
                            onValueChanged={this.handleFormChange}/>
                <InputField inputLabel="Estado"
                            inputHint="Estado"
                            inputDefaultValue={defaultPublicWork?.address.state}
                            inputKey="state"
                            onValueChanged={this.handleFormChange}/>
            </div>
        )
    }

}