const express = require('express')
require('./db/mongoose')
const path = require('path');

const userRouter = require('./routers/user')
const adminRoute = require('./routers/admin')
const contractRoute = require('./routers/contract')
const publicPath = path.join(__dirname, '../..', 'public')
const app = express()
app.use(express.static(publicPath))



app.use(express.json())
app.use(userRouter)
app.use(adminRoute)
app.use(contractRoute)

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});







module.exports = app;



