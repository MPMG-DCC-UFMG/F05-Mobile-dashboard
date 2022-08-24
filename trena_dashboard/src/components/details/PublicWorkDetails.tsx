import {MapView} from "../../screens/views/publicWork/MapView";
import React from "react";
import {PublicWork} from "../../core/models/PublicWork";


interface PublicWorkDetailsProps {
    publicWork: PublicWork
}

export const PublicWorkDetails: React.FC<PublicWorkDetailsProps> = (props) => {

    const {publicWork} = props

    return (
        <>
            <p>
                <strong> Obra Pública: </strong>
                <br/>
                Nome: {publicWork.name}
                <br/>
                ID: {publicWork.id}
                <br/>
                <br/>
                <strong>Endereço:</strong>
                <br/>
                {publicWork.address.street}, {publicWork.address.number} - {publicWork.address.neighborhood}
                <br/>
                {publicWork.address.city} - {publicWork.address.cep}
                <br/>
                Latitude: {publicWork.address.latitude} - Longitude: {publicWork.address.longitude}
            </p>
            <MapView latitude={publicWork.address.latitude} longitude={publicWork.address.longitude}
                     zoom={14}/>
            <br/>
            
        </>
    )
}