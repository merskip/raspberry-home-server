import React, {Component} from "react";
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
                    <CharacteristicsList sensor={sensor} characteristics={sensor['characteristics']}
                                         lastMeasurements={props['lastMeasurements']}/>
                </div>
            </div>
        ))}
    </div>
}

function CharacteristicsList(props) {
    let sensor = props['sensor'];
    let characteristics = props['characteristics'];
    let lastMeasurements = props['lastMeasurements'];

    return <div className="row">{
        characteristics.map((characteristic, index) => {
            let matchedMeasurement = (lastMeasurements || []).find(m => m['characteristicId'] === characteristic['id']);
            return <div key={index} className="col">
                <Characteristic sensor={sensor} characteristic={characteristic} measurement={matchedMeasurement}/>
            </div>
        })
    }</div>
}

class Characteristic extends Component {

    render() {
        return <div className="text-center">
            {this._renderIconOrTitle()}
            {this._renderValue()}
        </div>
    }

    _renderIconOrTitle() {
        return <div>
            {this._getIcon() || this.props['characteristic']['name']}
        </div>
    }

    _renderValue() {
        return <div className="mt-1">{
            !this.props['measurement']
                ? <ActivityIndicatorView small/>
                : <span style={{fontWeight: 500}}>{this._getFormattedValue()}</span>
        }</div>
    }

    _getIcon() {
        let characteristicNameToIconSrc = {
            "temperature": "static/icons/ic-thermometer.png",
            "pressure": "static/icons/ic-pressure-gauge.png",
            "humidity": "static/icons/ic-wet.png",
            "light": "static/icons/ic-sun.png",
            "boolean": "static/icons/ic-circle.png"
        };
        // TODO: Change to usage of flags
        let sensorNameToIconSrc = {
            "DS18B20 Outside": "static/icons/ic-temperature-outside.png"
        };

        let iconSrc = sensorNameToIconSrc[this.props['sensor']['name']] || characteristicNameToIconSrc[this.props['characteristic']['name']];

        // TODO: Change to usage of flags
        if (this._isDoorCharacteristic()) {
            iconSrc = this.props['measurement']['value'] ? "static/icons/ic-door-closed.png" : "static/icons/ic-door-opened.png";
        }
        return iconSrc
            ? <img src={iconSrc} alt={this.props['characteristic']['name']} title={this.props['characteristic']['name']}
                   style={{width: "42px"}}/>
            : null;
    }

    _getFormattedValue() {
        let formattedValue = this.props['measurement']['formattedValue'];
        if (this.props['characteristic']['type'] === "bool") {
            formattedValue = this.props['measurement']['value'] ? "True" : "False";
        }
        if (this.props['characteristic']['unit']) {
            formattedValue += " " + this.props['characteristic']['unit'];
        }
        if (this._isDoorCharacteristic()) {
            formattedValue = this.props['measurement']['value'] ? "Closed" : "Open";
        }
        return formattedValue;

    }

    _isDoorCharacteristic() {
        // TODO: Change to usage of flags
        return this.props['sensor']['name'] === "Balcony" && this.props['measurement'];
    }
}