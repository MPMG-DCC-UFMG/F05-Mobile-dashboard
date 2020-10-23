import React from 'react';
import './styles/App.css';
import './styles/trena.css';
import 'bulma/css/bulma.css';

import {Switch, Route, HashRouter} from 'react-router-dom';
import {ActionModal} from "./components/base/ActionModal";
import {MainScreen} from "./screens/MainScreen";
import {LoginScreen} from "./screens/LoginScreen";

function App() {
    return (
        <HashRouter>
            <div className="App">
                <Switch>
                    <Route exact path="/login">
                        <LoginScreen/>
                    </Route>
                    <Route path="/">
                        <MainScreen/>
                    </Route>
                </Switch>

                <ActionModal/>
            </div>
        </HashRouter>
    );
}

export default App;
