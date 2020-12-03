import React, {useState} from "react";
import {QueueItem} from "../../../core/models/QueueItem";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimesCircle} from "@fortawesome/free-solid-svg-icons";
import {useStores} from "../../../core/contexts/UseStores";
import {Steps} from "../../../components/lists/Steps";
import {PublicWorkDetails} from "../../../components/details/PublicWorkDetails";
import {QueueCollectView} from "./QueueCollectView";
import {QueuePhotoView} from "./QueuePhotoView";
import {observer} from "mobx-react";

interface AcceptViewProps {
    queueItem: QueueItem
}

export const AcceptView: React.FC<AcceptViewProps> = observer((props) => {

    const {queueItem} = props
    const {queueStore} = useStores()
    const allSteps = ["Obra pública", "Coletas", "Fotos", "Confirmar"]
    const [state, setState] = useState({step: 0})

    const handleCloseClick = () => {
        queueStore.selectQueueItem(undefined)
    }

    const onNextClicked = () => {
        if (state.step < allSteps.length - 1) {
            const newStep = state.step + 1
            setState((prevState) => {
                return {...prevState, step: newStep}
            })
        }
    }

    const nextEnabled = (): boolean => {
        if (state.step === 1 && queueStore.selectedCollect === undefined) {
            return false
        }
        return true
    }

    const onPrevClicked = () => {
        if (state.step > 0) {
            const newStep = state.step - 1
            stepActions(newStep)
            setState((prevState) => {
                return {...prevState, step: newStep}
            })
        }
    }

    const stepActions = (newStep: number) => {
        if (newStep === 0) {
            queueStore.selectCollect(undefined)
        }
    }

    const createStepViews = () => {
        switch (state.step) {
            case 0:
                return <PublicWorkDetails publicWork={queueItem.public_work}/>
            case 1:
                return <QueueCollectView/>
            case 2:
                return <QueuePhotoView photos={queueStore.selectedCollect!!.photos}/>
        }
    }

    return (
        <div className="panel">
            <div className="panel-heading">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            <button className="button is-danger" onClick={handleCloseClick}>
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faTimesCircle}/>
                            </span>
                            </button>
                        </div>
                    </div>
                    <p className="level-item has-text-centered">
                        {queueItem.public_work.name}
                    </p>
                </nav>
            </div>
            <div className="panel-block">
                <Steps stepsList={allSteps} currentStep={state.step}/>
            </div>
            <div className="panel-block" style={{height: "600px"}}>
                <div className="container is-flex has-text-left" style={{height: "100%"}}>
                    {createStepViews()}
                </div>
            </div>
            <div className="panel-block">
                <div className="container is-flex has-text-centered">
                    <button
                        className="button is-primary is-rounded"
                        disabled={state.step === 0}
                        onClick={onPrevClicked}>
                        Anterior
                    </button>
                    <button className="button is-primary is-rounded"
                            onClick={onNextClicked}
                            disabled={!nextEnabled()}>
                        {state.step < allSteps.length - 1 ? "Próximo" : "Confirmar"}
                    </button>
                </div>
            </div>
        </div>
    )
})