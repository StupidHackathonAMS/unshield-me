import '../styles/index.scss';
import Chart from 'chart.js';

// Adds a class to the header on scroll
let scrollpos = window.scrollY;
const header = document.querySelector("header");
const header_height = header.offsetHeight;
const add_class_on_scroll = () => header.classList.add("header-scrolled");
const remove_class_on_scroll = () => header.classList.remove("header-scrolled");

window.addEventListener('scroll', function() {
 scrollpos = window.scrollY;
 if (scrollpos >= header_height) { add_class_on_scroll(); }
 else { remove_class_on_scroll(); }
});


var personality = new Chart(document.getElementById("personality"),{"type":"radar","data":{"labels":["Introverted","Extraverted","Observant","Intuitive","Thinking","Feeling","Assertive"],"datasets":[{"label":"User","data":[65,59,90,81,56,55,40],"fill":true,"backgroundColor":"rgba(255, 99, 132, 0.2)","borderColor":"rgb(255, 99, 132)","pointBackgroundColor":"rgb(255, 99, 132)","pointBorderColor":"#fff","pointHoverBackgroundColor":"#fff","pointHoverBorderColor":"rgb(255, 99, 132)"}]},"options":{"elements":{"line":{"tension":0,"borderWidth":3}}}});

var browsingTime = new Chart(document.getElementById("browsing"),{"type":"line","data":{"labels":["January","February","March","April","May","June","July"],"datasets":[{"label":"Percentage of time spent behind computer","data":[65,59,80,81,56,55,40],"fill":false,"borderColor":"rgb(75, 192, 192)","lineTension":0.1}]},"options":{}});
