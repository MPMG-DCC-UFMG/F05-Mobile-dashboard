import React from "react";
import { BaseCRUDView } from "../../../components/base/BaseCRUDView";
import { Dropdown } from "../../../components/Form/Dropdown";
import { Inspection } from "../../../core/models/Inspection";

interface InspectionStatusViewProps {
  onChangeState: (key?: string) => void;
}

const initialState = {};

type InspectionCRUDViewState = typeof initialState | Inspection;

export default class InspectionStatusView extends BaseCRUDView<
  InspectionStatusViewProps,
  InspectionCRUDViewState
> {
  readonly state: InspectionCRUDViewState = initialState;

  constructor(props: InspectionStatusViewProps) {
    super(props);
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

  onChange = (value: InspectionCRUDViewState) => {};

  onStatusChange = (value: string, key?: string) => {
    console.log(value);
    this.props.onChangeState(value);
  };

  render() {
    return (
      <div className="container has-text-left">
        <Dropdown
          inputLabel="Status"
          optionsList={[
            { key: "0", value: "Nova" },
            { key: "1", value: "Pendente" },
            { key: "2", value: "Verificada" },
            { key: "3", value: "Negada" },
          ]}
          inputDefaultValue={"Nova"}
          onValueChanged={this.onStatusChange}
        />
      </div>
    );
  }
}
