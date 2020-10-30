const urlList = {
    "projects": "https://api.jsonbin.io/b/5f9bc786f0402361dceec056",
    "resources": "https://api.jsonbin.io/b/5f9bc7c6857f4b5f9ae00ced"
}
const secretKey = "$2b$10$13A5uhCyWMeIqOInL3bdeuAlJSI2Nx5J2h2HciLIGw1nb6Xm/NwRe";

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