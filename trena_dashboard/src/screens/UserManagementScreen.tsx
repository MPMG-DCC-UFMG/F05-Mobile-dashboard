import React from "react"
import {UserCRUDView} from "../views/user/UserCRUDView";
import {ListUser} from "../components/lists/ListUser";
import {useStores} from "../core/contexts/UseStores";

export const UserManagementScreen: React.FC<any> = () => {
    const {userStore} = useStores()
    userStore.loadUsers()

    return (
        <div className="columns">
            <div className="column is-one-third">
                <UserCRUDView/>
            </div>
            <div className="column is-two-thirds">
                <ListUser/>
            </div>
        </div>
    )
}