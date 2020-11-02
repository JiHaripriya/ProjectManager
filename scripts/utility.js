const urlList = {
    "projects": "https://api.jsonbin.io/b/5f9fb2c047077d298f5b96db",
    "resources": "https://api.jsonbin.io/b/5f9fb2fe47077d298f5b96e4"
}
const secretKey = "$2b$10$WcZYojSTl8qLjgXMXhMOEuLb53qjy34cf.CjEhzeojf8kMdWkYrRW";

let get = function (url, secretKey, callback) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            callback(JSON.parse(req.responseText));
        }
    };

    req.open("GET", url, false);
    req.setRequestHeader("secret-key", secretKey);
    req.send();
}

function printResult(res) {
    console.log(res);
}

function storeProjectData(res) {
    projects = res;
}

function storeResourceData(res) {
    resources = res;
}

let put = function (url, secretKey, obj, callback) {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(JSON.parse(req.responseText));
            callback(JSON.parse(req.responseText));
        }
    };

    req.open("PUT", url, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("secret-key", secretKey);
    req.setRequestHeader("versioning", false);
    req.send(JSON.stringify(obj));
}

// put("https://api.jsonbin.io/b/5f9bc42ff0402361dceebe82", secretKey, {"msg": "Hello World"}, printResult);

// let apis = { put, get };
// export default apis;