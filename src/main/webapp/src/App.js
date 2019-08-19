import React, {Component} from "react";
import * as ReactDOM from "react-dom";
import Sensor from "./Sensor";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            days: [],
            sensors: []
        };
        this.onChangedDay = this.onChangedDay.bind(this);

    }

    componentDidMount() {
        Promise.all([
            fetch('/api/sensors').then(r => r.json()),
            fetch('/api/availableDays').then(r => r.json())
        ]).then(([sensors, availableDays]) => {
            this.setState({
                days: availableDays.reverse(),
                sensors: sensors,
                selectedDay: availableDays[0]
            })
        });
    }

    onChangedDay(event) {
        let selectedDay = event.target.value;
        this.setState({
            selectedDay: selectedDay
        });
    };

    render() {
        return (
            <div>
                <h2>Raspberry Home</h2>
                <select className="form-control mb-3" onChange={this.onChangedDay} value={this.state.selectedDay}>
                    {this.state.days.map(day => (
                        <option value={day}>{day}</option>
                    ))}
                </select>
                {this.state.selectedDay &&
                <div>
                    {this.state.sensors.map(sensor => (
                        <Sensor sensor={sensor} date={this.state.selectedDay}/>
                    ))}
                </div>}
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);