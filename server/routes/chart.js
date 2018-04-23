const route = require('express').Router()
const {addChart, editChart, showAllChart, getChart, deleteItem, deleteChart} = require('../controllers/chart.controller');
const {loginAuth, adminOnly} = require('../middleware/auth')

route.get('/', loginAuth, getChart)
    .get('/all', adminOnly, showAllChart)
    .post('/add', loginAuth, addChart)
    .put('/edit/:id', loginAuth, editChart)
    .delete('/delete/:id', loginAuth, deleteChart)
    .delete('/delete/:id/item', loginAuth, deleteItem)

module.exports = route
