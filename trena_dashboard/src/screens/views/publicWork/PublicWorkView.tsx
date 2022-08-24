import {observer} from "mobx-react";
import {useStores} from "../../../core/contexts/UseStores";
import React from "react";
import {EmptyView} from "../EmptyView";
import {PublicWorkMenu} from "../../../components/menus/PublicWorkMenu";
import {PublicWorkDetails} from "../../../components/details/PublicWorkDetails";
import {ListInspection} from "../../../components/lists/ListInspection";

export const PublicWorkView = observer(() => {
    const {publicWorkStore, workStatusStore, inspectionStore} = useStores()
    const publicWork = publicWorkStore.selectedPublicWork
    const collectCount = publicWorkStore.collectsOfPublicWork.length

    inspectionStore.loadInspectionsByWorkId(publicWork?.id || "")

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
                                <PublicWorkDetails publicWork={publicWork}/>
                                <PublicWorkMenu collectCount={collectCount}
                                                workStateUser={getWorkStatus(publicWork?.user_status)}
                                                workStateIA={getWorkStatus(publicWork?.rnn_status)}
                                                onDownloadClicked={handleDownloadCollectClicked}/>
                                <ListInspection/>
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