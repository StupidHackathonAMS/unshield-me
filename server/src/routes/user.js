const router = require('express').Router()

const table = {}

router.post('/:id/visits', async (req, res) => {
    let user = table[req.params.id]
    if(!user)
        table[req.params.id] = { history : [] }
    table[req.params.id].history.push(req.body)
    res.send({
        type: 'success'
    })
})

router.get('/:id/visits', async (req, res) => {
    let user = table[req.params.id]
    if (!user)
        table[req.params.id] = { history : [] }
    res.send({ history: table[req.params.id].history })
})

module.exports = router