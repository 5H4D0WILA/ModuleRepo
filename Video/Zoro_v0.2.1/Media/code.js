function requestData() {
    var removeScripts = true;
    var allowExternalScripts = false;
    var usesApi = true;

    return JSON.stringify({
      request: null,
      removeScripts: removeScripts,
      allowExternalScripts: allowExternalScripts,
      usesApi: usesApi
    })
}

function logic() {
    const myElement = document.getElementById("json-result");
    const myJsonString = myElement.getAttribute("data-json");
    console.log(myJsonString)
    const myJsonObject = JSON.parse(myJsonString.replaceAll("'", '"'));
    const modified = document.createElement("div");
    modified.innerHTML = myJsonObject["html"];
    document.body.appendChild(modified);
    let subServers = document.querySelector(
        ".ps_-block.ps_-block-sub.servers-sub"
    );
    let dubServers = document.querySelector(
        ".ps_-block.ps_-block-sub.servers-dub"
    );
    let elements = subServers.querySelectorAll(".server-item");
    let servers = [];
    let subServersList = [];
    let dubServersList = [];
    for (let i = 0; i < elements.length; i++) {
        console.log(elements[i].innerText);
        subServersList.push({
            url:
                "https://zoro.to/ajax/v2/episode/sources?id=" +
                elements[i].getAttribute("data-id"),
            name: elements[i].innerText + " (Sub)",
        });
    }
    if (dubServers != null) {
        elements = dubServers.querySelectorAll(".server-item");
        for (let i = 0; i < elements.length; i++) {
            console.log(elements[i].innerText);
            dubServersList.push({
                url:
                    "https://zoro.to/ajax/v2/episode/sources?id=" +
                    elements[i].getAttribute("data-id"),
                name: elements[i].innerText + " (Dub)",
            });
        }
    }
    servers.push(
                   {
                       title: "Sub",
                       list: subServersList
                   },
                   {
                       title: "Dub",
                       list: dubServersList
                   },
                   )
    
    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify({
        result: servers,
        nextUrl: servers[0].list[0].url,
    });
    choutenDiv.appendChild(resultElement);
}
