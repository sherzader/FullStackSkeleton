const fs = require("fs");
const http = require("http");
const path = require("path");

const indexFile = path.join(__dirname, "index.html");
const stateFile = path.join(__dirname, "state.json");
const dummyState = { user: "wins" };

const routes = {
    "/api/gameState": handleGameStateRequest,
    "/": handleStaticRequest,
    "/index.html": handleStaticRequest,
    "/bundle.js": handleStaticRequest,
};
const port = 8888;
const server = http.createServer().listen(port);
console.log("server listening on port ", port);

/**
 * routes requests to a particular handler,
 * defined in routes constant.
 */
server.on("request", (request, response) => {
    const routeHandler = routes[request.url];
    const requestURL =
        request.url === "/" ? indexFile : path.join(__dirname, request.url);
    console.log("requesting", request.url);
    if (routeHandler) {
        routeHandler(requestURL, response);
    } else {
        response.end();
    }
});

function handleStaticRequest(request, response) {
    fs.readFile(request, (err, html) => {
        console.log("reading file...");
        response.writeHead(200, {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
        });
        try {
            response.write(html);
        } catch (err) {
            console.log(err);
        }
        console.log("wrote file...");
        response.end();
    });
}
function handleGameStateRequest(request, response) {
    const stateString = JSON.stringify(readFromFile());
    response.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
    });
    response.write(stateString);
    response.end();
}

/**
 *  Writes object to stateFile.
 * @param {{}} moreState
 * @return {void}
 */
function writeToFile(moreState = dummyState) {
    let jsonState = _readFile();
    jsonState = Object.assign(jsonState, moreState);
    fs.writeFileSync(stateFile, JSON.stringify(jsonState));
}

function _readFile() {
    const state = fs.readFileSync(stateFile);
    let jsonState = {};
    if (state) {
        jsonState = JSON.parse(state);
    }
    return jsonState;
}

/**
 * @return {{}} state
 */
function readFromFile() {
    console.log("game state: ", _readFile());
    return _readFile();
}
