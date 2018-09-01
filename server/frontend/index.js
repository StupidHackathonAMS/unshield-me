import axios from "axios";

axios
  .get("https://powerful-wave-30603.herokuapp.com/123/visits")
  .then(function(response) {
    const $info = document.querySelector(".js-info");
    $info.innerHTML = JSON.stringify(response.data);
  })
  .catch(function(error) {
    console.log(error);
  });
