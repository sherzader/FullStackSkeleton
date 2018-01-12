const fs = require("fs");
const http = require("http");
const path = require("path");

const indexFile = path.join(__dirname, "../static", "index.html");
const stateFile = path.join(__dirname, "../static", "state.json");

const routes = {
    "/api/state": handleStateRequest,
    "/": handleStaticRequest,
    "/index.html": handleStaticRequest,
    "/static/bundle.js": handleStaticRequest,
};
const port = 8888;
const server = http.createServer().listen(port);
console.log("server listening on port ", port);

/**
 * routes requests to corresponding handler,
 * defined in routes.
 */
server.on("request", (request, response) => {
    const routeHandler = routes[request.url];
    const requestURL =
        request.url === "/"
            ? indexFile
            : path.join(__dirname, "..", request.url);
    console.log("requesting", request.url);
    console.log("resolved path", requestURL);
    if (routeHandler) {
        routeHandler(requestURL, response);
    } else {
        response.end();
    }
});

function handleStaticRequest(request, response) {
    fs.readFile(request, (err, file) => {
        console.log("reading file...");

        try {
            response.write(file);
        } catch (err) {
            console.log(err);
        }
        console.log("wrote file...");
        response.end();
    });
}
function handleStateRequest(request, response) {
    const stateString = JSON.stringify(readFromFile());
    response.write(stateString);
    response.end();
}

/**
 *  Writes object to stateFile, without overwriting.
 * @param {{}} moreState
 * @return {void}
 */
function writeToFile(moreState) {
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
    console.log("saved state: ", _readFile());
    return _readFile();
}
