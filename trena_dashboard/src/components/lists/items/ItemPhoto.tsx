import {Photo} from "../../../core/models/Photo";
import React from "react";
import Config from "../../../config/Config";

interface ItemPhotoProps {
    photo: Photo
}

export const ItemPhoto: React.FC<ItemPhotoProps> = (props) => {

    const {photo} = props

    const createUrl = (): string => {
        return photo.filepath + `?X-TRENA-KEY=${Config.API_KEY}`
    }

    return (
        <div className="tile is-child card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src={createUrl()} alt="Placeholder image"/>
                </figure>
            </div>
            <footer className="card-footer">
                <a href="#" className="card-footer-item">Aceitar</a>
                <a href="#" className="card-footer-item">Remover</a>
            </footer>
        </div>
    )
}