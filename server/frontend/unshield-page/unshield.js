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
          inner += " 🍑🍆";
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
    Object.keys(response.data.forms).forEach((form, index) => {
      const child = document.createElement("div");
      let inner = `User filed in a form on ${form} :<ul>`;

      response.data.forms[form].forEach(fields => {
        inner += `<li>${fields.id} : ${fields.value}`;
        inner += fields.isCard ? " 💳" : "";
        inner += "</li>";
      });

      inner += "</ul>";

      child.innerHTML = inner;
      $info.appendChild(child);
    });
  })
  .catch(function(error) {
    console.log(error);
  });

axios
  .get("https://powerful-wave-30603.herokuapp.com/123/questions")
  .then(function(response) {
    console.log(response.data);
    const $info = document.querySelector(".js-questions");
    const child = document.createElement("div");

    response.data.questions.forEach(question => {
      const inner = `<div><b>Question</b> : ${
        question.question
      }</div><div class="answer"><b>Answer</b> : ${question.answer}</div>`;

      child.innerHTML = inner;
      $info.appendChild(child);
    });
  })
  .catch(function(error) {
    console.log(error);
  });
