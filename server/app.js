const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const db = mongoose.connection
const port = process.env.PORT || 3000
require('dotenv').config()
const index = require('./routes/index')
const itemIndex = require('./routes/item')
const chartIndex = require('./routes/chart')

const app = express()

let dbuser = process.env.dbuser
let dbpwd = process.env.dbpwd

//mongodb local
// mongoose.connect('mongodb://localhost/ecomm_ois')

//mongodb online mlab
mongoose.connect(`mongodb://${dbuser}:${dbpwd}@ds147659.mlab.com:47659/ecom_mis_db`)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))


db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function(){
  console.log(('Connected to mongoose'))
})


app.use('/', index)
app.use('/item', itemIndex)
app.use('/chart', chartIndex)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    message: err.message,
    error: {}
  })
})


app.listen(port, () => {
  console.log(`Server Started on ${port}`)
})

module.exports = app
