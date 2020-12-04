import {Photo} from "../../../core/models/Photo";
import React from "react";
import Config from "../../../config/Config";

interface ItemPhotoProps {
    photo: Photo
    footer: any
    filter?: string
}

export const ItemPhoto: React.FC<ItemPhotoProps> = (props) => {

    const {photo,footer,filter} = props

    const createUrl = (): string => {
        return photo.filepath + `?X-TRENA-KEY=${Config.API_KEY}`
    }

    return (
        <div className="card trena-card">
            <header className="card-header">
                <p className="card-header-title">
                    {photo.type}
                </p>
            </header>
            <div className="card-image">
                <figure className={"image is-4by3 "+filter ?? ""}>
                    <img src={createUrl()} alt="Placeholder image"/>
                </figure>
            </div>
            <footer className="card-footer">
                {footer}
            </footer>
        </div>
    )
}