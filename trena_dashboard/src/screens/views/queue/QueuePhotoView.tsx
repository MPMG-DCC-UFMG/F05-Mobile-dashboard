import React from "react";
import {Photo} from "../../../core/models/Photo";
import { ItemPhoto } from "../../../components/lists/items/ItemPhoto";

interface QueuePhotoViewProps {
    photos: Photo[]
}

export const QueuePhotoView: React.FC<QueuePhotoViewProps> = (props) => {

    const {photos} = props

    return (
        <div className="tile is-ancestor">
            {photos.map(photo =>{
                return <ItemPhoto photo={photo}/>
                }
            )}
        </div>
    )
}