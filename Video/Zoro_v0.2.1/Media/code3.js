function requestData() {
    var removeScripts = false;
    var allowExternalScripts = true;
    var usesApi = true;
    var imports = [
        "https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.1.1/crypto-js.min.js"
    ];

    return JSON.stringify({
      request: null,
      removeScripts: removeScripts,
      allowExternalScripts: allowExternalScripts,
      usesApi: usesApi,
      imports: imports
    })
}

function logic() {
    const myElement = document.getElementById("json-result");
    const myJsonString = myElement.getAttribute("data-json");
    const myJsonObject = JSON.parse(myJsonString.replaceAll("'", '"'));
function getFile(url) {
            var request = new XMLHttpRequest();
            request.open("GET", url, false);
            request.send(null);
            if (request.status === 200) {
                return request.responseText;
            } else {
                return null;
            }
        }
    if (myJsonObject["encrypted"] == true) {
        
        let base64 = myJsonObject["sources"];
        let key = getFile(
            "https://raw.githubusercontent.com/enimax-anime/key/e6/key.txt"
        );
        decryptedSources = CryptoJS.AES.decrypt(base64, key).toString(
            CryptoJS.enc.Utf8
        );

        const manifestUrl = JSON.parse(decryptedSources)[0].file;
        const resResult = getFile(manifestUrl);

        let qualities = []
        const resolutions = resResult.split("\\n\\n")[0].match(/(RESOLUTION=)(.*)(\s*?)(\s*.*)/g);
        resolutions?.forEach((res) => {
          const index = manifestUrl.lastIndexOf('/');
          const quality = res.split('\n')[0].split('x')[1].split(',')[0];
          const url = manifestUrl.slice(0, index);
          qualities.push({
            file: url + '/' + res.split('\n')[1].replace("/", ""),
            type: "hls",
            quality: quality + 'p',
          });
        });

        qualities.push({quality: "auto", file: manifestUrl, type: "hls"})

        const uniqueAuthors = qualities.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item.quality === current.quality)) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);

        qualities = uniqueAuthors.map(item => item)

        let choutenDiv = document.getElementById("chouten");
        let resultElement = document.createElement("p");
        resultElement.innerText = JSON.stringify({
            result: {
                skips:
                    myJsonObject["intro"] != null
                        ? [
                              {
                                  start: myJsonObject["intro"]["start"],
                                  end: myJsonObject["intro"]["end"],
                                  type: "Opening",
                              },
                              {
                                  start: myJsonObject["outro"]["start"],
                                  end: myJsonObject["outro"]["end"],
                                  type: "Ending",
                              },
                          ]
                        : [],
                sources: qualities,
                subtitles: myJsonObject["tracks"]
                    .map((element) => {
                        if (element["kind"] == "captions") {
                            return {
                                url: element["file"],
                                language: element["label"],
                            };
                        }
                    })
                    .filter((elements) => {
                        return (
                            elements != null &&
                            elements !== undefined &&
                            elements !== ""
                        );
                    }),
            },
            nextUrl: null,
        });
        choutenDiv.appendChild(resultElement);
    } else {
        const manifestUrl = myJsonObject["sources"][0].file;
        const resResult = getFile(manifestUrl);

        let qualities = []
        const resolutions = resResult.split("\\n\\n")[0].match(/(RESOLUTION=)(.*)(\s*?)(\s*.*)/g);
        resolutions?.forEach((res) => {
          const index = manifestUrl.lastIndexOf('/');
          const quality = res.split('\n')[0].split('x')[1].split(',')[0];
          const url = manifestUrl.slice(0, index);
          qualities.push({
            file: url + '/' + res.split('\n')[1].replace("/", ""),
            type: "hls",
            quality: quality + 'p',
          });
        });

        qualities.push({quality: "auto", file: manifestUrl, type: "hls"})

        const uniqueAuthors = qualities.reduce((accumulator, current) => {
            if (!accumulator.find((item) => item.quality === current.quality)) {
              accumulator.push(current);
            }
            return accumulator;
          }, []);

        qualities = uniqueAuthors.map(item => item)
        let choutenDiv = document.getElementById("chouten");
        let resultElement = document.createElement("p");
        resultElement.innerText = JSON.stringify({
            result: {
                skips:
                    myJsonObject["intro"] != null
                        ? [
                              {
                                  start: myJsonObject["intro"]["start"],
                                  end: myJsonObject["intro"]["end"],
                                  type: "Opening",
                              },
                              {
                                  start: myJsonObject["outro"]["start"],
                                  end: myJsonObject["outro"]["end"],
                                  type: "Ending",
                              },
                          ]
                        : [],
                sources: qualities,
                subtitles: myJsonObject["tracks"]
                    .map((element) => {
                        if (element["kind"] == "captions") {
                            return {
                                url: element["file"],
                                language: element["label"],
                            };
                        }
                    })
                    .filter((elements) => {
                        return (
                            elements != null &&
                            elements !== undefined &&
                            elements !== ""
                        );
                    }),
            },
            nextUrl: null,
        });
        choutenDiv.appendChild(resultElement);
    }
}
