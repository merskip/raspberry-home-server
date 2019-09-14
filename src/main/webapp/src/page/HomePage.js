import React, {Component, Fragment} from "react";
import ActivityIndicatorView from "../view/ActivityIndicatorView";

export default class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            sensors: null,
            lastMeasurements: null
        };
    }

    componentDidMount() {
        fetch(`api/sensors`)
            .then(res => res.json())
            .then(sensors => {
                console.log(sensors);
                this.setState({
                    sensors: sensors
                });

                fetch(`api/sensors/${sensors.map(s => s['id']).join(',')}/lastMeasurements`)
                    .then(res => res.json())
                    .then(measurements => {
                        this.setState({
                            lastMeasurements: measurements
                        });
                    });
            });
    }

    render() {
        return <div className="container">
            {!this.state.sensors ? <ActivityIndicatorView/>
                : <SensorsGrid sensors={this.state.sensors} lastMeasurements={this.state.lastMeasurements}/>}
        </div>
    }
}

function SensorsGrid(props) {
    return <div className="card-columns">
        {props['sensors'].map((sensor, index) => (
            <div key={index} className="card">
                <div className="card-body">
                    <h5 className="card-title">{sensor['name']}</h5>
                    {sensor['characteristics'].map((characteristic, index) => {
                        let lastMeasurement = (props['lastMeasurements'] || []).find(m => m['characteristicId'] === characteristic['id']);
                        return (
                            <CharacteristicValue key={index} sensor={sensor} characteristic={characteristic}
                                                 lastMeasurement={lastMeasurement}/>
                        )
                    })}
                </div>
            </div>
        ))}
    </div>
}

function CharacteristicValue(props) {
    return <div className="mt-2">{props['characteristic']['name']}<br/>
            {!props['lastMeasurement']
                ? <ActivityIndicatorView spinner-grow/>
                : <strong>{props['lastMeasurement']['formattedValue']} {props['characteristic']['unit']}</strong>
            }
        </div>
}