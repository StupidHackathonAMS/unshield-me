const router = require('express').Router()

let _ ={
    table: []
}

router.post('/:id/visits', async (req, res) => {
    res.send("OK")
})

router.get('/:id/visits', async (req, res) => {
    res.send("OK")
})

module.exports = router