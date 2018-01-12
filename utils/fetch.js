export default function fetch(route, headers = {}) {
    return window
        .fetch(route, headers)
        .then(response => {
            return response.json();
        })
        .then(json => json)
        .catch(err => err.message);
}
