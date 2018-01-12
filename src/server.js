const fs = require("fs");
const http = require("http");
const path = require("path");

const indexFile = path.join(__dirname, "../static", "index.html");
const stateFile = path.join(__dirname, "../static", "state.json");

const routes = {
    "/api/state": handleStateRequest,
    "/": handleStaticRequest,
    "/static/bundle.js": handleStaticRequest,
};
const port = 8888;
const server = http.createServer().listen(port);
console.log("server listening on port ", port);

/**
 * Routes requests to corresponding handler,
 * defined in routes.
 */
server.on("request", (request, response) => {
    const routeHandler = routes[request.url];
    const requestURL =
        request.url === "/"
            ? indexFile
            : path.join(__dirname, "..", request.url);
    let resource = "";

    if (routeHandler) {
        resource = routeHandler(requestURL, response);
        response.write(resource);
    }
    response.end();
});

/**
 * Returns requested resource.
 * @param {String} path
 * @return {void}
 */
function handleStaticRequest(path) {
    return fs.readFileSync(path);
}

/**
 * Returns saved state.
 * @param {String} path
 * @return {String}
 */
function handleStateRequest(path) {
    return JSON.stringify(getState());
}

/**
 * Adds state to stateFile.
 * @param {{}} newState
 * @return {void}
 */
function saveState(newState) {
    const savedState = getState();
    const allState = Object.assign(savedState, newState);
    fs.writeFileSync(stateFile, JSON.stringify(allState));
}

/**
 * Gets the state saved in stateFile.
 * @return {{}} state
 */
function getState() {
    const state = fs.readFileSync(stateFile) || "{}";
    return JSON.parse(state);
}
