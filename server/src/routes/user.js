const router = require('express').Router()

const table = {},
    unsafeRegex = /(nazi|fascist|porn)/g,
    template = { 
        history : [], 
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

router.post('/:id/visits', async (req, res) => {
    let user = table[req.params.id]
    if(!user)
        user = table[req.params.id] = Object.assign({}, template)
    req.body.tags = []
    unsafeModifier(req, user)
    table[req.params.id].history.push(req.body)
    res.send({
        type: 'success'
    })
})

router.get('/:id/visits', async (req, res) => {
    let user = table[req.params.id]
    if (!user)
        table[req.params.id] = { history : [] }
    res.send({ 
        history: table[req.params.id].history 
    })
})

router.get('/:id/preferences', async (req, res) => {
    let user = table[req.params.id]
    if (!user)
        user = table[req.params.id] = Object.assign({}, template)
    res.send({ 
        preferences: table[req.params.id].preferences 
    })
})

module.exports = router