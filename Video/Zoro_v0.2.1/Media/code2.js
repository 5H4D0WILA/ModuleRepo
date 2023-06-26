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
    const embedId = myJsonObject["link"]
        .replace("https://rapid-cloud.co/embed-6/", "")
        .split("?")[0];
    const url = `https://rapid-cloud.co/ajax/embed-6/getSources?id=${embedId}`;
    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify({ result: [], nextUrl: url });
    choutenDiv.appendChild(resultElement);
}
