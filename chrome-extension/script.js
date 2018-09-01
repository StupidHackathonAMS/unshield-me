/*
 * Network logic
 */

var urlBackend = 'https://powerful-wave-30603.herokuapp.com'
var pathVisits = '/123/visits'

function sendVisit(domain, millisecondsSpent) {
  var body = JSON.stringify({
    domain: domain,
    millisecondsSpent: millisecondsSpent,
  })
  console.log("sending visit: "+body)
  fetch(urlBackend + pathVisits, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: body,
  })
  .then(() => console.log("success!"))
}

/*
 * Information retrieving routines
 */

var domainRegex = /https?:\/\/([a-zA-Z0-9\.]+)(\/.*)/g

function getDomain(url) {
  var res = domainRegex.exec(url)
  if (!res || res.length < 2) throw new Error("No domain found")
  return res[1]
}

function getMillisecondsSpent(start) {
  var currentTime = new Date()
  return currentTime.getTime() - start.getTime()
}

/*
 * Tabs
 */

var tabs = {};

/*
 * Chrome interaction
 */

var listener = function(tabID, changeInfo, tab) {
  switch (changeInfo.status) {
    case 'complete':
      tabs[tabID] = tab
      tabs[tabID].start = new Date()
    case 'loading':
      // Collect the old page
      var oldTab = tabs[tabID]
      if (!oldTab) {
        return
      }
      console.log("about to send page...")
      var millisecondsSpent = getMillisecondsSpent(oldTab.start)
      if (millisecondsSpent < 1000) {
        console.log("too early")
        return
      }
      sendVisit(getDomain(oldTab.url), getMillisecondsSpent(oldTab.start))
  }
}
chrome.tabs.onUpdated.addListener(listener)
