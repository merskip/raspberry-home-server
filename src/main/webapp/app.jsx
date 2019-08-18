const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {sensors: []};
    }

    componentDidMount() {
        fetch('/api/sensors')
            .then(res => res.json())
            .then((data) => {
                this.setState({sensors: data})
            });
    }

    render() {
        return (
            <div>
                <h2>Sensors</h2>
                <ul>
                    {this.state.sensors.map((sensor) => (
                        <li>{sensor.name}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);