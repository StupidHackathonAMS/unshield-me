import axios from "axios";
import prettyMs from "pretty-ms";

axios
  .get("https://powerful-wave-30603.herokuapp.com/123/visits")
  .then(function(response) {
    const $info = document.querySelector(".js-info");
    response.data.history.forEach(site => {
      if (site.domain && site.millisecondsSpent) {
        const child = document.createElement("div");
        child.innerHTML = `You spent ${prettyMs(
          site.millisecondsSpent
        )} on <a href=${site.domain}>${site.domain}</a>`;
        $info.appendChild(child);
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });
