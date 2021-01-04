import React from "react"
import {UserCRUDView} from "./views/user/UserCRUDView";
import {ListUser} from "../components/lists/ListUser";
import {useStores} from "../core/contexts/UseStores";
import {observer} from "mobx-react";

export const UserManagementScreen: React.FC<any> = observer(() => {
    const {userStore} = useStores()
    userStore.loadUsers()

    return (
        <div className="columns">
            <div className="column is-one-third">
                <UserCRUDView initialUser={userStore.selectedUser}/>
            </div>
            <div className="column is-two-thirds">
                <ListUser/>
            </div>
        </div>
    )
})