import React, {Component} from "react";
import * as ReactDOM from "react-dom";
import Navigation from "./Navigation";

class App extends Component {

    render() {
        return (
            <Navigation/>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);