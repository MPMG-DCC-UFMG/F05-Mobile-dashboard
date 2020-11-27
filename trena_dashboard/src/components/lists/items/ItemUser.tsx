import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../../core/models/User";

interface ItemUserProps {
    user: User
    onDeleteClicked: (userName: string) => void
}

export const ItemUser: React.FC<ItemUserProps> = (props) => {

    const {user} = props

    return (
        <div className="panel-block" key={user.email}>
            <div className="container">
                <nav className="level">
                    <div className="level-left">
                        <div className="level-item">
                            {user.email}
                        </div>
                        <span className="tag is-info">{user.role}</span>
                    </div>
                    <div className="level-right">
                        <div className="level-item">
                            <button className="button is-danger" onClick={() => {
                                props.onDeleteClicked(user.email)
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