import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

interface ItemUserProps {
    username: string
    onDeleteClicked: (userName: string) => void
}

export const ItemUser: React.FC<ItemUserProps> = (props) => {

    const {username} = props

    return (
        <div className="panel-block" key={username}>
            <div className="container">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            {username}
                        </div>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-danger" onClick={() => {
                                props.onDeleteClicked(username)
                            }}>
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faTrash}/>
                            </span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    )
}