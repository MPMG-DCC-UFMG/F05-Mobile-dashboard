import React from "react";
import {InputField} from "../base/InputField";
import {TypeWork} from "../../../core/models/TypeWork";

interface TypeWorkViewProps {
    defaultTypeWork?: TypeWork,
    onChangeTypeWork?: (typeWork: TypeWork) => void
}

export const TypeWorkView: React.FC<TypeWorkViewProps> = (props) => {

    const handleFormChange = (value: string, key?: string) => {
        if (props.onChangeTypeWork) {
            props.onChangeTypeWork({...props.defaultTypeWork, name: value})
        }
    }

    return (
        <div className="container has-text-left">
            <InputField
                inputLabel="Tipo de Obra"
                inputHint="Adicionar novo tipo de obra .."
                inputDefaultValue={props.defaultTypeWork?.name}
                onValueChanged={handleFormChange}/>
        </div>
    )
}