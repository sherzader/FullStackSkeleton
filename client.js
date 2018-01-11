import React, { Component } from "react";
import ReactDOM from "react-dom";
import fetch from "./utils/fetch";

const ROUTE = "http://localhost:8888/api/gameState";
const HEADERS = {};

class App extends Component {
    constructor() {
        super();
        this.state = { gameState: {} };
    }
    componentDidMount() {
        this.getGameState();
    }
    async getGameState() {
        const gameState = await fetch(ROUTE, HEADERS);
        this.setState({ gameState });
    }
    render() {
        const { gameState } = this.state;
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>User</th>
                            <th>Result</th>
                        </tr>
                        {Object.keys(gameState).map((user, i) => (
                            <tr key={i}>
                                <td>{user}</td>
                                <td>{gameState[user]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
