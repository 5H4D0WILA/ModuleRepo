function requestData() {
    var Request = {
        url: "https://zoro.to/home",
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
    let top = document.querySelector(".deslide-wrap");
    let spotlights = top.querySelectorAll(".deslide-item");

    let spotlight_data = []
    for (let i = 0; i < spotlights.length; i++) {
        let item = spotlights[i];

        spotlight_data.push(
            {
                url: `https://zoro.to${item.querySelector(".desi-buttons > .btn.btn-secondary.btn-radius").getAttribute("href")}`,
                titles: {
                    primary: item.querySelector(".desi-head-title.dynamic-name").innerText,
                    secondary: item.querySelector(".desi-head-title.dynamic-name").getAttribute("data-jname")
                },
                image: item.querySelector(".film-poster-img").getAttribute("data-src"),
                subtitle: item.querySelector(".desi-description").innerText.trim(),
                subtitleValue: [],
                buttonText: "Watch Now",
                iconText: item.querySelector(".sc-detail > div:nth-child(1)").innerText.trim(),
                showIcon: false,
                indicator: "Spotlight"
            }
        )
    }

    let recents_wrapper = document.querySelector("#main-content > section:nth-child(2)").querySelector(".film_list-wrap");
    let recents = recents_wrapper.querySelectorAll(".flw-item");

    let recents_data = []
    for (let i = 0; i < recents.length; i++) {
        let item = recents[i];

        recents_data.push(
            {
                url: `https://zoro.to${item.querySelector(".dynamic-name").getAttribute("href")}`,
                titles: {
                    primary: item.querySelector(".dynamic-name").innerText
                },
                image: item.querySelector(".film-poster-img").getAttribute("data-src"),
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.querySelector(".tick-rate")?.innerText,
                current: item.querySelector(".tick-sub") != null ? parseInt(item.querySelector(".tick-sub").innerText) : null,
                total: item.querySelector(".tick-eps") != null ? parseInt(item.querySelector(".tick-eps").innerText) : null
            }
        )
    }
    let new_wrapper = document.querySelector("#main-content > section:nth-child(5)").querySelector(".film_list-wrap");
    let new_list = new_wrapper.querySelectorAll(".flw-item");

    let new_data = []
    for (let i = 0; i < new_list.length; i++) {
        let item = new_list[i];

        new_data.push(
            {
                url: `https://zoro.to${item.querySelector(".dynamic-name").getAttribute("href")}`,
                titles: {
                    primary: item.querySelector(".dynamic-name").innerText
                },
                image: item.querySelector(".film-poster-img").getAttribute("data-src"),
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.querySelector(".tick-rate")?.innerText,
                current: item.querySelector(".tick-sub") != null ? parseInt(item.querySelector(".tick-sub").innerText) : null,
                total: item.querySelector(".tick-eps") != null ? parseInt(item.querySelector(".tick-eps").innerText) : null
            }
        )
    }
    // #main-content > section:nth-child(8)
    let upcoming_wrapper = document.querySelector("#main-content > section:nth-child(8)").querySelector(".film_list-wrap");
    let upcoming_list = upcoming_wrapper.querySelectorAll(".flw-item");

    let upcoming_data = []
    for (let i = 0; i < upcoming_list.length; i++) {
        let item = upcoming_list[i];

        upcoming_data.push(
            {
                url: `https://zoro.to${item.querySelector(".dynamic-name").getAttribute("href")}`,
                titles: {
                    primary: item.querySelector(".dynamic-name").innerText
                },
                image: item.querySelector(".film-poster-img").getAttribute("data-src"),
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.querySelector(".tick-rate")?.innerText,
                current: item.querySelector(".tick-sub") != null ? parseInt(item.querySelector(".tick-sub").innerText) : null,
                total: item.querySelector(".tick-eps") != null ? parseInt(item.querySelector(".tick-eps").innerText) : null
            }
        )
    }

    let top_viewed_wrapper = document.querySelector("#top-viewed-day");
    let top_viewed_list = top_viewed_wrapper.querySelectorAll("li");

    let top_viewed_data = []
    for (let i = 0; i < top_viewed_list.length; i++) {
        let item = top_viewed_list[i];

        top_viewed_data.push(
            {
                url: `https://zoro.to${item.querySelector(".dynamic-name").getAttribute("href")}`,
                titles: {
                    primary: item.querySelector(".dynamic-name").innerText
                },
                image: item.querySelector(".film-poster-img").getAttribute("data-src"),
                subtitle: "",
                subtitleValue: [],
                showIcon: false,
                buttonText: "",
                indicator: item.querySelector(".fdi-item.ml-2")?.innerText + " Views",
                current: item.querySelector(".tick-sub") != null ? parseInt(item.querySelector(".tick-sub").innerText) : null,
                total: item.querySelector(".tick-eps") != null ? parseInt(item.querySelector(".tick-eps").innerText) : null
            }
        )
    }

    let choutenDiv = document.getElementById("chouten");
    let resultElement = document.createElement("p");
    resultElement.innerText = JSON.stringify({
        result: [
            {
                type: "Carousel",
                title: "Spotlight",
                data: spotlight_data
            },
            {
                type: "list",
                title: "Recently Released",
                data: recents_data
            },
            {
                type: "grid_2x",
                title: "Now on Zoro",
                data: new_data
            },
            {
                type: "list",
                title: "Top Upcoming",
                data: upcoming_data
            },
            {
                type: "grid_3x",
                title: "Most Viewed",
                data: top_viewed_data
            },
        ],
        nextUrl: null
    });
    choutenDiv.appendChild(resultElement);
}