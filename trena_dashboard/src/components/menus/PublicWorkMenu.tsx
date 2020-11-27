import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

interface PublicWorkMenuProps {
    collectCount: number
    workStateUser: string
    workStateIA: string
    onDownloadClicked?: () => void
}

export const PublicWorkMenu: React.FC<PublicWorkMenuProps> = (props) => {

    const {collectCount, workStateUser, workStateIA, onDownloadClicked} = props

    return (
        <nav className="level">
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">Coletas</p>
                    <p className="title">{collectCount}</p>
                </div>
            </div>
            <div className="level-item">
                <button className="button is-medium" onClick={onDownloadClicked}>
                    <span className="icon">
                       <FontAwesomeIcon icon={faDownload}/>
                    </span>
                    <span>Baixar dados de coletas</span>
                </button>
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">Estado da Obra Usuário</p>
                    <span className="tag is-info">{workStateUser}</span>
                </div>
            </div>
            <div className="level-item has-text-centered">
                <div>
                    <p className="heading">Estado da Obra RNN</p>
                    <span className="tag is-info">{workStateIA}</span>
                </div>
            </div>
        </nav>
    )
}