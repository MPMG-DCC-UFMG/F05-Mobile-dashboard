import React from 'react';
import './styles/App.css';
import './styles/trena.css';
import 'bulma/css/bulma.css';

import {NavigationMenu} from './components/menus/NavigationMenu';
import {Home} from './screens/Home';
import {ScreenPublicWork} from './screens/ScreenPublicWork';
import {ScreenTypeOfWork} from './screens/ScreenTypeOfWork';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {ActionModal} from "./components/base/ActionModal";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
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
                                    <ScreenTypeOfWork/>
                                </Route>
                                <Route path="/publicWork">
                                    <ScreenPublicWork/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
                <ActionModal/>
            </div>
        </BrowserRouter>
    );
}

export default App;
