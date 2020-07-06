import React from 'react';
import './styles/App.css';
import './styles/trena.css';
import 'bulma/css/bulma.css';

import {Menu} from './components/navigation/Menu';
import {Home} from './screens/Home';
import {ScreenPublicWork} from './screens/ScreenPublicWork';
import {ScreenTypeOfWork} from './screens/ScreenTypeOfWork';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <div className="columns is-fullheight mt-1">
                    <div className="column is-one-fifth">
                        <Menu/>
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
            </div>
        </BrowserRouter>
    );
}

export default App;
