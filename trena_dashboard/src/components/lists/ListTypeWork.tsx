import {observer} from "mobx-react";
import {useStores} from "../../core/stores/UseStores";
import React from "react";
import {ItemTypeWork} from "../items/ItemTypeWork";

export const ListTypeWork = observer(() => {
    const {typeWorkStore} = useStores()

    return (
        <>
            <div className="box">
                <table className="table is-fullwidth">
                    <tbody>
                    {typeWorkStore.typeWorksList.map(typeWork => {
                            return <ItemTypeWork
                                key={typeWork.flag}
                                flag={typeWork.flag}
                                name={typeWork.name}/>
                        }
                    )}
                    </tbody>
                </table>
            </div>
        </>
    )
})