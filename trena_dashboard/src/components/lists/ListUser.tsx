import {observer} from "mobx-react";
import React from "react";
import {useStores} from "../../core/contexts/UseStores";
import {ItemUser} from "./items/ItemUser";

export const ListUser = observer(() => {

    const {userStore} = useStores()

    const handleUserDeleted = (username: string) => {
        userStore.deleteUser(username)
    }

    return (
        <>
            <div className="panel">
                <div className="panel-heading">
                    <nav className="level">
                        <div className="level-left">
                            <div className="level-item">
                                Usuários
                            </div>
                        </div>
                    </nav>
                </div>
                {userStore.usersList.map(user => {
                    return <ItemUser user={user} key={user.email}
                                     onDeleteClicked={handleUserDeleted}/>
                })}
            </div>
        </>
    )
})