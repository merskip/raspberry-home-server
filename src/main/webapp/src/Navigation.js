import React, {Component} from "react";
import {BrowserRouter as Router, Link, NavLink, Route} from "react-router-dom";
import HomePage from "./HomePage";
import ChartPage from "./ChartPage";
import NoFoundPage from "./NoFoundPage";
import Switch from "react-router-dom/es/Switch";


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
        <h1>Raspberry Home</h1>
        <ul className="nav nav-pills">
            <li className="nav-item">
                <NavLink exact={true} to="/" className="nav-link" activeClassName="active">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/chart" className="nav-link" activeClassName="active">Chart</NavLink>
            </li>
        </ul>
    </div>
}
