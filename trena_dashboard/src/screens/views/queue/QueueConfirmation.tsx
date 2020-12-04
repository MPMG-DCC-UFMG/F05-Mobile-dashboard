import React from "react";
import {useStores} from "../../../core/contexts/UseStores";

export const QueueConfirmation: React.FC<any> = (props) => {

    const {queueStore} = useStores()

    return (
        <section className="hero is-medium">
            <div className="hero-body">
                <div className="container has-text-centered">
                    <h1 className="title">
                        Confirmar coleta realizada e salvar no banco de dados?
                    </h1>
                    {queueStore.ignoredPhotoIds.size > 0 &&
                        <div>
                            <h2>
                                {queueStore.ignoredPhotoIds.size} foto ignorada(s)
                            </h2>
                            <br/>
                            <h3 className="subtitle is-size-6 has-text-danger">
                                Todas as fotos ignoradas serão removidas permanentemente!
                            </h3>
                        </div>
                    }
                </div>
            </div>
        </section>
    )
}