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

class CharacteristicValue extends Component {

    render() {
        return <div className="mt-2">
            {this._getIcon() || <>{this.props['characteristic']['name']}<br/></>}
            {!this.props['lastMeasurement']
                ? <ActivityIndicatorView small/>
                : <strong>{this.props['lastMeasurement']['formattedValue']} {this.props['characteristic']['unit']}</strong>
            }
        </div>
    }

    _getIcon() {
        let iconId = this._getIconId();
        return iconId
            ? <img src={`static/icons/${iconId}`} alt="Temperature" style={{width: "42px"}}/>
            : null;
    }

    _getIconId() {
        switch (this.props['characteristic']['name']) {
            case "temperature":
                return "icons8-thermometer-48.png";
            case "pressure":
                return "icons8-pressure-gauge-48.png";
            case "humidity":
                return "icons8-dew-point-48.png";
            case "light":
                return "icons8-sun-48.png";
            case "boolean":
                return "icons8-circle-48.png";
            default:
                return null;
        }
    }
}