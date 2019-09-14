import React, {Component} from "react";
import ActivityIndicatorView from "../view/ActivityIndicatorView";

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sensors: null
        };
    }

    componentDidMount() {
        fetch(`api/sensors`)
            .then(res => res.json())
            .then(result => {
                this.setState({
                    sensors: result
                })
            });
    }

    render() {
        return (<div className="container">
            {!this.state.sensors ? <ActivityIndicatorView/>
                : <SensorsGrid sensors={this.state.sensors}/>}
        </div>)
    }
}

function SensorsGrid(props) {
    return (<div className="row">{
        props.sensors.map((item, index) => (
            <div className="col-4" key={index}>{index}: {item['name']}</div>
        ))
    }
    </div>)
}