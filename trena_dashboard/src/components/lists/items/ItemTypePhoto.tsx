import {TypePhoto} from "../../../core/models/TypePhoto";
import {observer} from "mobx-react";
import React from "react";
import {useStores} from "../../../core/contexts/UseStores";

interface ItemTypePhotoProps {
    typePhoto: TypePhoto
}

export const ItemTypePhoto: React.FC<ItemTypePhotoProps> = observer((props) => {
    const {typePhoto} = props
    const {typePhotoStore} = useStores()

    const isSelected = typePhoto.flag === typePhotoStore.selectedTypePhoto?.flag

    const handleClick = () => {
        typePhotoStore.selectTypePhoto(typePhoto)
    }
    return (
        <tr className={(isSelected ? "is-selected has-background-grey-lighter has-text-black" : "")} onClick={handleClick}>
            <td>
                {typePhoto.name}
            </td>
            <td>
                {typePhoto.description}
            </td>
        </tr>
    )
})