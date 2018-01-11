export default function fetch(route, headers = {}) {
    return window
        .fetch(route, headers)
        .then(response => {
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                return response.json();
            }
        })
        .then(json => json)
        .catch(err => err.message);
}
