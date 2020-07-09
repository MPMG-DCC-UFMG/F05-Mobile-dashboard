import {observer} from "mobx-react";
import React from "react";
import {useStores} from "../../../core/stores/UseStores";

interface ActionModalProps {

}

export const ActionModal: React.FC<ActionModalProps> = observer((props) => {
    const {viewStore} = useStores()
    const viewInModal = viewStore.viewInModal

    const closeModal = () => {
        viewStore.setViewInModal()
    }

    const handleConfirmClick = () => {
        let onConfirmClick = viewInModal?.onConfirmClick;
        if (onConfirmClick) {
            onConfirmClick()
        }
        closeModal()
    }

    return (
        <div className={"modal " + (viewInModal !== undefined ? "is-active" : "")}>
            <div className="modal-background"/>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{viewInModal?.title}</p>
                    <button className="delete" aria-label="close" onClick={closeModal}/>
                </header>
                <section className="modal-card-body">
                    {viewInModal?.contentView}
                </section>
                <footer className="card-footer-right modal-card-foot">
                    <button className="button" onClick={closeModal}>Cancel</button>
                    <button className="button is-success"
                            onClick={handleConfirmClick}>{viewInModal?.confirmButton}</button>
                </footer>
            </div>
        </div>
    )
})