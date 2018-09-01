const router = require('express').Router()
const creditcard = require('creditcard.js')

const table = {},
    unsafeRegex = /(nazi|fascist|porn|kitten|explode|gun|kill|EFF)/g,
    template = { 
        history : [], 
        questions: [],
        data: {},
        preferences: {
            unsafe: {
                pages: [],
                time: 0,
            }
        } 
    }

const unsafeModifier = (req, user) =>
{
    if(!unsafeRegex.test(req.body.domain))
        return
    req.body.tags.push("unsafe") 
    let match = req.body.domain.match(unsafeRegex)
    req.body.tags = req.body.tags.concat(match)
    if(!user.preferences.unsafe.pages.includes(req.body.domain))
        user.preferences.unsafe.pages.push(req.body.domain)  
    user.preferences.unsafe.time += req.body.millisecondsSpent  
}

const getUser = (req) => {
    let user = table[req.params.id]
    if(!user)
        user = table[req.params.id] = Object.assign({}, template)
    return user

}

router.post('/:id/visits', async (req, res) => {
    let user = getUser(req)
    req.body.tags = []
    unsafeModifier(req, user)
    table[req.params.id].history.push(req.body)
    res.send({
        type: 'success'
    })
})

const creditCardParser = (form) => {
    var CreditCard = new creditcard()
    let card = {
        formHasCard: false
    }
    for (const element of form) {
        if(CreditCard.isValid(element.value)){
            card = {
                formHasCard: true,
                type: CreditCard.getCreditCardNameByNumber(element.value),
                number: element.value
            }
            element.isCard = true
            element.provider = CreditCard.getCreditCardNameByNumber(element.value)
        }
        else
            element.isCard = false
    }
    return card
}

router.post('/:id/form', async (req, res) => {
    let user = getUser(req)
    if(!user.data[req.body.domain])
        user.data[req.body.domain] = req.body.form
    else
        user.data[req.body.domain] = user.data[req.body.domain].concat(req.body.form)
    let creditCard = creditCardParser(req.body.form)
    res.send({
        type: 'success',
        creditCard
    })
})

router.post('/:id/question', async (req, res) => {
    let user = getUser(req)
    user.questions.push(req.body)
    res.send({
        type: 'success'
    })
})

router.get('/:id/questions', async (req, res) => {
    res.send({
        questions: getUser(req).questions 
    })
})

router.get('/:id/visits', async (req, res) => {
    res.send({ 
        history: getUser(req).history 
    })
})

router.get('/:id/preferences', async (req, res) => {
    res.send({ 
        preferences: getUser(req).preferences 
    })
})

router.get('/:id/forms', async (req, res) => {
    res.send({ 
        forms: getUser(req).data 
    })
})

module.exports = router