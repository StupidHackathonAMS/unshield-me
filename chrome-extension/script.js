var urlBackend = 'https://powerful-wave-30603.herokuapp.com'
var pathVisits = '/123/visits'

function sendVisit(domain, ipAddress, millisecondsSpent) {
  var body = {
    domain: domain,
    ipAddress: ipAddress,
    millisecondsSpent: millisecondsSpent,
  }
  fetch(urlBackend + pathVisits, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body),
  })
  .then(response => console.log(response))
}

var domainRegex = /https?:\/\/([a-zA-Z0-9\.]+)(\/.*)/g

function getDomain() {
  var url = document.URL
  var res = domainRegex.exec(url)
  if (!res || res.length < 2) throw new Error("No domain found")
  return res[1]
}

var startTime = new Date()

function getMillisecondsSpent() {
  var currentTime = new Date()
  return currentTime.getTime() - startTime.getTime()
}
