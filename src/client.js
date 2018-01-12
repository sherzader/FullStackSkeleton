import React, { Component } from "react";
import ReactDOM from "react-dom";
import fetch from "../utils/fetch";

const ROUTE = "/api/state";
const HEADERS = {};

class App extends Component {
    constructor() {
        super();
        this.state = { savedState: {} };
    }
    componentDidMount() {
        this.getState();
    }
    async getState() {
        const savedState = await fetch(ROUTE, HEADERS);
        this.setState({ savedState });
    }
    render() {
        const { savedState } = this.state;
        return (
            <div>
                <table>
                    <tbody>
                        {Object.keys(savedState).map((user, i) => (
                            <tr key={i}>
                                <td>{user}</td>
                                <td>{savedState[user]}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById("root"));
