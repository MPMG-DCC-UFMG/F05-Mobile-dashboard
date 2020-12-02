import {Route, Switch, Redirect} from "react-router-dom";
import {Home} from "./Home";
import {TypeOfWorkScreen} from "./TypeOfWorkScreen";
import {PublicWorkScreen} from "./PublicWorkScreen";
import React from "react";
import {observer} from "mobx-react";
import {useStores} from "../core/contexts/UseStores";
import {NavigationMenu} from "../components/menus/NavigationMenu";
import {UserManagementScreen} from "./UserManagementScreen";
import {WorkStatusScreen} from "./WorkStatusScreen";
import {TypePhotoScreen} from "./TypePhotoScreen";
import {CollectScreen} from "./CollectScreen";
import {QueueScreen} from "./QueueScreen";

export const MainScreen = observer(() => {

    const {userStore, workStatusStore, typePhotoStore} = useStores()

    workStatusStore.loadWorkStatus()
    typePhotoStore.loadTypePhotoList()

    if (userStore.loggedUser === undefined) {
        return <Redirect to="/login"/>
    }

    return (
        <div className="columns is-fullheight mt-1">
            <div className="column is-one-fifth">
                <NavigationMenu/>
            </div>
            <div className="column">
                <div className="box is-fullheight mr-2">
                    <Switch>
                        <Route exact path="/">
                            <Home/>
                        </Route>
                        <Route path="/typeOfWork">
                            <TypeOfWorkScreen/>
                        </Route>
                        <Route path="/typePhoto">
                            <TypePhotoScreen/>
                        </Route>
                        <Route path="/publicWork">
                            <PublicWorkScreen/>
                        </Route>
                        <Route path="/workStatus">
                            <WorkStatusScreen/>
                        </Route>
                        <Route path="/users">
                            <UserManagementScreen/>
                        </Route>
                        <Route path="/collect">
                            <CollectScreen/>
                        </Route>
                        <Route path="/queue">
                            <QueueScreen/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
})