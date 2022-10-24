import React from "react";
import { BaseCRUDView } from "../../../components/base/BaseCRUDView";
import { InputField } from "../../../components/Form/InputField";
import { InputTextArea } from "../../../components/Form/InputTextArea";
import { TypePhoto } from "../../../core/models/TypePhoto";

interface TypePhotoCRUDViewProps {
  defaultTypePhoto?: TypePhotoCRUDViewState;
  onChangeTypePhoto?: (typePhoto: TypePhoto) => void;
}

const initialState = {
  flag: 0,
  name: "",
  description: "",
};

type TypePhotoCRUDViewState = typeof initialState | TypePhoto;

export default class TypePhotoCRUDView extends BaseCRUDView<
  TypePhotoCRUDViewProps,
  TypePhotoCRUDViewState
> {
  readonly state: TypePhotoCRUDViewState = initialState;

  constructor(props: TypePhotoCRUDViewProps) {
    super(props);

    if (props.defaultTypePhoto) {
      this.state = props.defaultTypePhoto;
    }
  }

  isValid(): boolean {
    let valid = true;
    Object.values(this.state).forEach((value) => {
      if (!value) {
        valid = false;
      }
    });
    return valid;
  }

  onChange = (value: TypePhotoCRUDViewState) => {
    if (this.props.onChangeTypePhoto) {
      this.props.onChangeTypePhoto(value as TypePhoto);
    }
  };

  onDescriptionChanged = (value: string) => {
    this.setState((prevState) => {
      let newState = { ...prevState, description: value };
      this.onChange(newState);
      return newState;
    });
  };

  render() {
    return (
      <div className="container has-text-left">
        <InputField
          inputLabel="Tipo de Foto"
          inputHint="Adicionar novo tipo de foto ..."
          inputDefaultValue={this.state.name}
          inputName="name"
          onValueChanged={this.handleFormChange}
        />
        <InputTextArea
          inputLabel="Descrição"
          inputHint="Descrição da foto"
          inputDefaultValue={this.state.description}
          inputName="description"
          onValueChanged={this.onDescriptionChanged}
        />
      </div>
    );
  }
}
