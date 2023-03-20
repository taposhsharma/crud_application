const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./model/connection')
const session = require('express-session')


app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true
  }));

app.use(cors())
app.use(express.json())
app.use(require('./routes/user'))
const PORT = 5000
app.listen(PORT,console.log(`Server is running at ${PORT}`))
