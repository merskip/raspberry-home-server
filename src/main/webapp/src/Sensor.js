import React, {Component} from "react";
import {Line} from "react-chartjs-2";

export default class Sensor extends Component {

    constructor(props) {
        super(props);
        this.sensor = props.sensor;
        this.state = {
            chart_data: null
        };
    }

    componentDidMount() {
        this._fetch(this.sensor, this.props.date);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.sensor = this.props.sensor;
        if (this.props.date !== prevProps.date) {
            this._fetch(this.sensor, this.props.date);
        }
    }

    _fetch(sensor, date) {
        fetch(`api/sensors/${sensor.id}/measurements/${date}`)
            .then(res => res.json())
            .then(measurements => {
                let measurementsByCharacteristic = Sensor.groupMeasurementsByCharacteristic(measurements);
                this.setState({
                    chart_data: {
                        datasets: this._getDataSets(measurementsByCharacteristic)
                    },
                    chart_options: {
                        maintainAspectRatio: false,
                        scales: {
                            xAxes: this._getXAxes(),
                            yAxes: this._getYAxes(measurementsByCharacteristic)
                        }
                    }
                });
            });
    }

    _getDataSets(measurementsByCharacteristic) {
        return Object.keys(measurementsByCharacteristic).map((characteristicId) => {
            let measurements = measurementsByCharacteristic[characteristicId];
            let characteristic = this.getCharacteristicById(characteristicId);

            return {
                label: characteristic['name'],
                fill: false,
                borderColor: Sensor._getDataSetColor(characteristic),
                data: measurements.map(m => {
                    return {
                        t: new Date(m['timeStart']),
                        y: m['value']
                    }
                }),
                xAxisID: 'time',
                yAxisID: characteristic['name']
            };
        });
    }

    static _getDataSetColor(characteristic) {
        switch (characteristic['name']) {
            case "temperature": return '#1957c0';
            case "light": return "#d8de15";
            case "pressure": return "#23d8de";
            case "humidity": return "#14c544";
            case "boolean": return "#de6219";
            default: return  "#55504e";
        }
    }

    _getYAxes(measurementsByCharacteristic) {
        return Object.keys(measurementsByCharacteristic).map((characteristicId, index) => {
            let characteristic = this.getCharacteristicById(characteristicId);

            return {
                id: characteristic['name'],
                type: 'linear',
                position: index % 2 === 0 ? 'left' : 'right',
                scaleLabel: {
                    display: true,
                    labelString: characteristic['name']
                }
            }
        });
    }

    _getXAxes() {
        let timezoneOffsetMillis = new Date().getTimezoneOffset() * 60 * 1000;
        let currentDayUTC = new Date(this.props.date);
        let beginningDayDate = new Date(currentDayUTC.getTime() + timezoneOffsetMillis);
        let endingDayDate = new Date(beginningDayDate.getTime() + 3600 * 24 * 1000);

        return [{
            id: 'time',
            type: 'time',
            display: true,
            time: {
                unit: 'hour',
                min: beginningDayDate,
                max: endingDayDate,
                displayFormats: {
                    hour: 'H:mm'
                }
            },
        }];
    }

    static groupMeasurementsByCharacteristic(measurements) {
        return measurements.reduce((result, measurement) => {
            let characteristicId = measurement['characteristicId'];
            if (!result[characteristicId]) result[characteristicId] = [];
            result[characteristicId].push(measurement);
            return result;
        }, {});
    }

    getCharacteristicById(characteristicId) {
        return this.sensor['characteristics'].find(c => c['id'] === characteristicId);
    }

    render() {
        return (
            <div>
                <strong>{this.sensor.name}</strong>
                {this.state.chart_data != null &&
                <Line data={this.state.chart_data} height={256} options={this.state.chart_options}/>
                }
            </div>
        )
    }
}
