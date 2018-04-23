const jwt = require('jsonwebtoken')
const Chart = require('../models/chart.model')
const Item = require('../models/item.model')
const pwdtoken = process.env.pwdtoken

module.exports = {
  showAllChart: function (req, res) {
    Chart.find()
        .populate('user')
        .exec()
        .then(chart =>{
          res.status(200).json({
            message: "Show All chart",
            data: chart
          })
        })
        .catch(err => {
          res.status(500).json({
            message: "error",
            err
          })
        })
  },
  getChart: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let userId = decoded.id

    Chart.find({user: userId})
        .populate('item')
        .exec()
        .then(chart =>{
          res.status(200).json({
            message: "Show All chart",
            data: chart
          })
        })
        .catch(err => {
          res.status(500).json({
            message: "error",
            err
          })
        })
  },
  addChart: function (req, res) {
    let token = req.headers.token
    let decoded = jwt.verify(token, pwdtoken)
    let userId = decoded.id

    let newchart = new Chart ({
      user: userId,
      item: req.body.item,
      quantity: req.body.quantity
    })
    findItem(req.body.item, (item, result) => {
      if (result === 'success') {
        // console.log(item)
        newchart.save( (err, result) => {
          if(err){
            res.status(500).json({
              message: "error",
              err
            })
          }else{
            result.item = item
            res.status(200).json({
              message: "New chart has been added",
              data: result
            })
          }
        })
      } else {
        console.log('Ini Error', item)
      }
    })
    
  },
  editChart: function (req, res) {
    //kayanya ga kepake
    let chart_id = req.params.id
    let quantity = req.body.quantity

    Chart.update(
      { _id:chart_id },
      { $set:{ quantity } } )
        .then(result => {
          res.status(200).json({
            message: "Edit chart Success",
            result
          })
        })
        .catch(err => {
          res.status(500).json({
            message: "error",
            err
          })
        })
  },
  deleteItem: function (req, res) {
    //delete only 1 item from chart
    if(req.params.id){
      let item_id = req.params.id
      Chart.findOneAndRemove({item: item_id})
          .then(item => {
            // console.log(item)
            res.status(200).json({item})
          })
          .catch(err => {
            res.status(500).json({
              message: "error",
              err
            })
          })
    }else{
      res.status(406).json({
        message: "item Id is undefined"
      })
    }
  },
  deleteChart: function (req, res) {
    //delete all item with the same id
    if(req.params.id){
      let item_id = req.params.id
      // console.log(item_id)
      Chart.remove({item: item_id})
          .then(result => {
            res.status(200).json({
              message: "Delete item in chart Success",
              result
            })
          })
          .catch(err => {
            res.status(500).json({
              message: "error",
              err
            })
          })
    }else{
      res.status(406).json({
        message: "item Id is undefined"
      })
    }
  }
}

function findItem (id, cb) {
  Item.findOne({_id: id})
      .then(item =>{
        cb(item, 'success')
      })
      .catch(err => {
        cb(err, 'error')
      })
}