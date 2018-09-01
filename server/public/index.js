import axios from 'axios';

axios.get('/123/visits').then(function (response) {
  alert(response);
}).catch(function (error) {
  alert(error);
});
axios.get('/123/preferences').then(function (response) {
  alert(response);
}).catch(function (error) {
  alert(error);
});
