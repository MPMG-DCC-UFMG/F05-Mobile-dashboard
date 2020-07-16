import {observer} from "mobx-react";
import {useStores} from "../core/stores/UseStores";
import React from "react";
import {EmptyView} from "./EmptyView";
import {MapView} from "./MapView";


export const PublicWorkView = observer(() => {
    const {publicWorkStore} = useStores()
    const publicWork = publicWorkStore.selectedPublicWork

    return (
        <>{
            publicWork ? (
                <div className="box">
                    <article className="media">
                        <div className="media-content">
                            <div className="content has-text-left">
                                <p>
                                    <strong>{publicWork.name}</strong>
                                    <br/>
                                    {publicWork.address.street}, {publicWork.address.number} - {publicWork.address.neighborhood}
                                    <br/>
                                    {publicWork.address.city} - {publicWork.address.cep}
                                </p>
                                <MapView latitude={publicWork.address.latitude} longitude={publicWork.address.longitude}
                                         zoom={14}/>
                            </div>
                        </div>
                    </article>
                </div>
            ) : (
                <EmptyView/>
            )
        }

        </>
    )
})