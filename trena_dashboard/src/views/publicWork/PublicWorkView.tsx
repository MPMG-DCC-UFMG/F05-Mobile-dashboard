import {observer} from "mobx-react";
import {useStores} from "../../core/contexts/UseStores";
import React from "react";
import {EmptyView} from "../EmptyView";
import {MapView} from "./MapView";
import {PublicWorkMenu} from "../../components/menus/PublicWorkMenu";


export const PublicWorkView = observer(() => {
    const {publicWorkStore, workStatusStore} = useStores()
    const publicWork = publicWorkStore.selectedPublicWork
    const collectCount = publicWorkStore.collectsOfPublicWork.length

    const handleDownloadCollectClicked = () => {
        if (publicWork) {
            publicWorkStore.downloadCollectJSONReport(publicWork.id)
        }
    }

    const getWorkStatus = (_status?: number): string => {
        const status = _status
        if (status) {
            const workStatus = workStatusStore.getWorkStatusByFlag(status)
            return workStatus?.name ?? "--"
        } else {
            return "--"
        }
    }

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
                                    <br/>
                                    Latitude: {publicWork.address.latitude} - Longitude: {publicWork.address.longitude}
                                </p>
                                <MapView latitude={publicWork.address.latitude} longitude={publicWork.address.longitude}
                                         zoom={14}/>
                                <br/>
                                <PublicWorkMenu collectCount={collectCount}
                                                workStateUser={getWorkStatus(publicWork?.user_status)}
                                                workStateIA={getWorkStatus(publicWork?.rnn_status)}
                                                onDownloadClicked={handleDownloadCollectClicked}/>
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