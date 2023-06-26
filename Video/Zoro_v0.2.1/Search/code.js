function requestData() {
    var Request = {
        url: "https://zoro.to/search?keyword=<query>",
        method: "GET",
        headers: [],
        body: null
    };
    var removeScripts = true
    var allowExternalScripts = false
  
    return JSON.stringify({
      request: Request,
      removeScripts: removeScripts,
      allowExternalScripts: allowExternalScripts
    })
}

function logic() {
    const elements = document.querySelectorAll(
        ".film_list-wrap .film-detail > h3 > a"
    );
    const images = document.querySelectorAll(".film_list-wrap .film-poster > img");
    const subDub = document.querySelectorAll(
        ".film_list-wrap > div > .film-poster > div.tick.ltr"
    );
    const epCounts = document.querySelectorAll(
        ".film_list-wrap > div > .film-poster > .tick.ltr > div"
    );
    const titles = [];
    for (let i = 0; i < elements.length; i++) {
        let hasSub = subDub[i].innerText.includes("SUB");
        let hasDub = subDub[i].innerText.includes("DUB");
        let counts = epCounts[i].innerText.replace("Ep ", "").split("/");
        titles.push({
            url: `https://zoro.to${elements[i].getAttribute("href")}`,
            img: images[i].getAttribute("data-src"),
            title: elements[i].innerText,
            indicatorText: `${hasSub ? "Sub" : ""}${hasSub && hasDub ? "|" : ""}${
                hasDub ? "Dub" : ""
            }`,
            currentCount: parseInt(counts[0]),
            totalCount: parseInt(counts[1]),
        });
    }
    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify(titles);
    choutenDiv.appendChild(resultElement);
}