const route = require('express').Router()
const images = require('../helpers/images')
const {createItem, editItem, showAllItem, deleteItem} = require('../controllers/item.controller');
const {adminOnly} = require('../middleware/auth')

route.get('/', showAllItem)
    .post('/upload',
    adminOnly,
    images.multer.single('image'), 
    images.sendUploadToGCS,
    (req, res) => {
      res.status(200).json({  
        message: 'Your file is successfully uploaded',
        link: req.file.cloudStoragePublicUrl
      })
    })
    .post('/add', adminOnly, createItem)
    .put('/edit/:id', adminOnly, editItem)
    .delete('/delete/:id', adminOnly, deleteItem)

module.exports = route
