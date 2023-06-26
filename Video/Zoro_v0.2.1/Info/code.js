function requestData() {
    var removeScripts = true;
    var allowExternalScripts = false;
  
    return JSON.stringify({
      request: null,
      removeScripts: removeScripts,
      allowExternalScripts: allowExternalScripts
    })
}

function logic() {
    let titles = {
        primary: document.querySelector(".film-name.dynamic-name").innerText,
        secondary: document.querySelector(
            ".anisc-info > .item.item-title > .name"
        ).innerText,
    };
    let description = document.querySelector(
        ".item.item-title.w-hide > .text"
    ).innerText;
    let poster = document
        .querySelector(".film-poster-img")
        ?.getAttribute("src");
    let status = Array.from(document.querySelectorAll(".item.item-title"))
        .find((el) => el.innerText.includes("Status"))
        .querySelector(".name").innerText;
    let totalMediaCount = document.querySelector(".tick-eps").innerText;
    let seasons = [...document.querySelectorAll(".os-list > a")].map(
        (season) => {
            return {name: season.innerText.trim(), url: `https://zoro.to${season.getAttribute('href')}`};
        }
    );
    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    let nextUrl =
        "https://zoro.to/ajax/v2/episode/list/" +
        document.getElementById("wrapper").getAttribute("data-id");
    resultElement.innerText = JSON.stringify({
        result: {
            id: "",
            titles: titles,
            altTitles: [],
            description: description,
            poster: poster,
            status: status,
            totalMediaCount: parseInt(totalMediaCount),
            mediaType: "Episodes",
            seasons: seasons,
            mediaList: [],
        },
        nextUrl: nextUrl,
    });
    choutenDiv.appendChild(resultElement);
}
