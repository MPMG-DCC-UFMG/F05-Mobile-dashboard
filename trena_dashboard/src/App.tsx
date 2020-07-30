import React from 'react';
import './styles/App.css';
import './styles/trena.css';
import 'bulma/css/bulma.css';

import {Switch, Route, BrowserRouter} from 'react-router-dom';
import {ActionModal} from "./components/base/ActionModal";
import {MainScreen} from "./screens/MainScreen";
import {LoginScreen} from "./screens/LoginScreen";

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Switch>
                    <Route path="/login">
                        <LoginScreen/>
                    </Route>
                    <Route path="/">
                        <MainScreen/>
                    </Route>
                </Switch>

                <ActionModal/>
            </div>
        </BrowserRouter>
    );
}

export default App;
