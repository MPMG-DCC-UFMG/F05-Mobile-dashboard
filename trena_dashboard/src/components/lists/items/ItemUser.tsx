import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {User} from "../../../core/models/User";
import {useStores} from "../../../core/contexts/UseStores";
import {observer} from "mobx-react";

interface ItemUserProps {
    user: User
    onDeleteClicked: (userName: string) => void
}

export const ItemUser: React.FC<ItemUserProps> = observer((props) => {

    const {userStore} = useStores()
    const {user,onDeleteClicked} = props

    const isSelected = user.email === userStore.selectedUser?.email

    const handleClick = () => {
        userStore.selectUser(user)
    }

    return (
        <a className={"panel-block" + (isSelected ? " has-background-grey-lighter" : "")}  key={user.email}
        onClick={handleClick}>
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
                                onDeleteClicked(user.email)
                            }}>
                            <span className="icon is-small">
                                <FontAwesomeIcon icon={faTrash}/>
                            </span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>
        </a>
    )
})