import React, { Component } from "react";
import ReactDOM from "react-dom";

class App extends Component {
    constructor() {
        super();
        this.state = { gameState: {} };
    }
    componentDidMount() {
        const route = new Request("/api/gameState");
        fetch(route).then(response =>
            this.setState({ gameState: response.json() })
        );
    }
    render() {
        return <div>Ssssss {this.state.gameState}</div>;
    }
}
ReactDOM.render(<App />, document.getElementById("root"));
