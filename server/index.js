const middlewareBinder = require('./src/binders/middleware-binder'),
      routeBinder = require('./src/binders/route-binder'),
      port = process.env.PORT || 8080,
      exceptionHandler = require('express-exception-handler')

exceptionHandler.handle()
const app = require('express')()
middlewareBinder(app)
routeBinder(app) 
app.use(exceptionHandler.middleware)

app.listen(port)