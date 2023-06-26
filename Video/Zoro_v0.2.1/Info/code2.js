function requestData() {
    var removeScripts = false;
    var allowExternalScripts = true;
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
    const myJsonObject = JSON.parse(myJsonString.replaceAll("'", '"'));
    const modified = document.createElement("div");
    modified.innerHTML = myJsonObject["html"];
    document.body.appendChild(modified);
    const allEpInfo = [...document.querySelectorAll(".ssl-item.ep-item")].map(
        (e) => {
            return {
                url:
                    "https://zoro.to/ajax/v2/episode/servers?episodeId=" +
                    e.getAttribute("href").split("?ep=")[1],
                title: e.getAttribute("title"),
                number: parseFloat(e.getAttribute("data-number")),
            };
        }
    );
    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify({title: "Season 1", list: allEpInfo});
    choutenDiv.appendChild(resultElement);
}
