import axios from "axios";
import prettyMs from "pretty-ms";

axios
  .get("https://powerful-wave-30603.herokuapp.com/123/visits")
  .then(function(response) {
    console.log(response.data);
    const $info = document.querySelector(".js-visits");
    response.data.history.forEach(site => {
      if (site.domain && site.millisecondsSpent) {
        const child = document.createElement("div");
        let inner = `User spent ${prettyMs(
          site.millisecondsSpent
        )} on <a href=${site.domain}>${site.domain}</a>`;

        if (site.tags.length) {
          inner += " naughty naughty !";
        }

        child.innerHTML = inner;
        $info.appendChild(child);
      }
    });
  })
  .catch(function(error) {
    console.log(error);
  });

axios
  .get("https://powerful-wave-30603.herokuapp.com/123/forms")
  .then(function(response) {
    console.log(response.data);
    const $info = document.querySelector(".js-forms");
    // response.data.history.forEach(site => {
    //   if (site.domain && site.millisecondsSpent) {
    //     const child = document.createElement("div");
    //     let inner = `User spent ${prettyMs(
    //       site.millisecondsSpent
    //     )} on <a href=${site.domain}>${site.domain}</a>`;

    //     if (site.tags.length) {
    //       inner += " naughty naughty !";
    //     }

    //     child.innerHTML = inner;
    //     $info.appendChild(child);
    //   }
    // });
  })
  .catch(function(error) {
    console.log(error);
  });
