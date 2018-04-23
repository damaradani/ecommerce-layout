const Item = require('../models/item.model')

module.exports = {
  showAllItem: function(req, res){
    Item.find()
        .exec()
        .then(item =>{
          res.status(200).json({
            message: "Show All Item",
            data: item
          })
        })
        .catch(err => {
          res.status(500).json({
            message: "error",
            err
          })
        })
  },
  createItem: function(req, res){

    if(req.body.name && req.body.price
      && req.body.imgUrl && req.body.category && req.body.stock){
      let newItem = new Item ({
        name: req.body.name,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        category: req.body.category,
        stock: req.body.stock
      })

      newItem.save((err, result) => {
        if(err){
          res.status(500).json({
            message: "error",
            err
          })
        }else{
          res.status(200).json({
            message: "New Item has been added",
            data: result
          })
        }
      })
    }else{
      res.status(406).json({
        message: "U need to fill all field"
      })
    }


  },
  editItem: function(req, res){
    let item_id = req.params.id
    let name = req.body.name
    let price = req.body.price
    let imgUrl = req.body.imgUrl //kayanya g usah update jg gpp
    let category = req.body.category
    let stock = req.body.stock
    // console.log(req.body)
    Item.update(
      { _id:item_id },
      { $set:{ name, price, category, stock, imgUrl } } )
        .then(result => {
          res.status(200).json({
            message: "Edit Item Success",
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
  deleteItem: function(req, res){

    if(req.params.id){
      let item_id = req.params.id

      Item.remove({_id:item_id})
          .then(result => {
            res.status(200).json({
              message: "Delete Item Success",
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
        message: "Item Id is undefined"
      })
    }


  }
}
