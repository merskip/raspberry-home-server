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
                    <CharacteristicsList characteristics={sensor['characteristics']} lastMeasurements={props['lastMeasurements']}/>
                </div>
            </div>
        ))}
    </div>
}

function CharacteristicsList(props) {
    let characteristics = props['characteristics'];
    let lastMeasurements = props['lastMeasurements'];

    return <div className="row">{
        characteristics.map((characteristic, index) => {
            let matchedMeasurement = (lastMeasurements || []).find(m => m['characteristicId'] === characteristic['id']);
            return <div key={index} className="col">
                <Characteristic characteristic={characteristic} measurement={matchedMeasurement}/>
            </div>
        })
    }</div>
}

class Characteristic extends Component {


    render() {
        return <div className="text-center">
            {this._renderIconOrTitle()}
            <div className="mt-1">{!this.props['measurement']
                ? <ActivityIndicatorView small/>
                : <span style={{fontWeight: 500}}>{this._getFormattedValue()}</span>
            }
            </div>
        </div>
    }

    _renderIconOrTitle() {
        return <div>
            {this._getIcon() || this.props['characteristic']['name']}
        </div>
    }

    _getIcon() {
        let characteristicNameToIconSrc = {
            "temperature": "static/icons/ic-thermometer.png",
            "pressure": "static/icons/ic-pressure-gauge.png",
            "humidity": "static/icons/ic-dew-point.png",
            "light": "static/icons/ic-sun.png",
            "boolean": "static/icons/ic-circle.png"
        };
        let iconSrc = characteristicNameToIconSrc[this.props['characteristic']['name']];
        return iconSrc
            ? <img src={iconSrc} alt={this.props['characteristic']['name']} title={this.props['characteristic']['name']}
                   style={{width: "42px"}}/>
            : null;
    }

    _getFormattedValue() {
        let formattedValue = this.props['measurement']['formattedValue'];
        if (this.props['characteristic']['type'] === "boolean") {
            formattedValue = this.props['measurement']['value'] ? "True" : "False";
        }

        return `${formattedValue} ${this.props['characteristic']['unit']}`
    }
}