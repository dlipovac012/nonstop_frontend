import React from 'react';
import { render } from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";
import Home from './Home';
import Room from './Room';

function App() {
	return (
		<Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/:roomId">
                    <Room />
                </Route>
            </Switch>
        </Router>
	);
};

render(<App />, document.getElementById('app'));