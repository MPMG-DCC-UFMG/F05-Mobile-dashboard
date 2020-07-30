import {Route, Switch, Redirect} from "react-router-dom";
import {Home} from "./Home";
import {TypeOfWorkScreen} from "./TypeOfWorkScreen";
import {ScreenPublicWork} from "./PublicWorkScreen";
import React from "react";
import {observer} from "mobx-react";
import {useStores} from "../core/stores/UseStores";
import {NavigationMenu} from "../components/menus/NavigationMenu";

export const MainScreen = observer(() => {

    const {userStore} = useStores()

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
                        <Route path="/publicWork">
                            <ScreenPublicWork/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
})