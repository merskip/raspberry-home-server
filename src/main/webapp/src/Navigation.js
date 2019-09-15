import React, {Component} from "react";
import {BrowserRouter as Router, NavLink, Route, Switch} from "react-router-dom";

import NoFoundPage from "./NoFoundPage";
import HomePage from "./page/HomePage";
import ChartPage from "./page/ChartPage";


export default class Navigation extends Component {

    render() {
        return <Router>
            <NavigationMenu/>
            <Switch>
                <Route path="/" exact component={HomePage}/>
                <Route path="/chart" component={ChartPage}/>
                <Route component={NoFoundPage}/>
            </Switch>
        </Router>
    }
}

function NavigationMenu() {
    return <div className="container">
        <h1 className="mt-3 mb-4 display-4">Raspberry Home</h1>
        <ul className="nav nav-pills mb-4">
            <li className="nav-item">
                <NavLink exact={true} to="/" className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/chart" className="nav-link" activeClassName="active">Chart</NavLink>
            </li>
        </ul>
    </div>
}
