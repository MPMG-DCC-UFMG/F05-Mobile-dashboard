import React from "react";
import {InputField} from "../form/InputField";
import {TypeWork} from "../../../core/models/TypeWork";

interface TypeWorkCRUDViewProps {
    defaultTypeWork?: TypeWork,
    onChangeTypeWork?: (typeWork: TypeWork) => void
}

export const TypeWorkCRUDView: React.FC<TypeWorkCRUDViewProps> = (props) => {

    const handleFormChange = (value: string) => {
        if (props.onChangeTypeWork) {
            props.onChangeTypeWork({...props.defaultTypeWork, name: value})
        }
    }

    return (
        <div className="container has-text-left">
            <InputField
                inputLabel="Tipo de Obra"
                inputHint="Adicionar novo tipo de obra ..."
                inputDefaultValue={props.defaultTypeWork?.name}
                onValueChanged={handleFormChange}/>
        </div>
    )
}