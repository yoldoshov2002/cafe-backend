const express = require('express')
const connnection = require('../connnection')
const router = express.Router()

var auth = require('../services/authentication')
var checkRole = require('../services/checkRole')


router.post('/add', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let category = req.body;
    query = "insert into category (name) values(?)";
    connnection.query(query, [category.name], (err, results) => {
        if (!err) {
            return res.status(200).json({
                message: "Category Added Successfully"
            })
        } else {
            return res.status(500).json(err)
        }
    })
})


router.get('/get', auth.authenticateToken, (req, res, next) => {
    var query = "select *from category order by name";

    connnection.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results)
        } else {
            return res.status(500).json(err)
        }
    })
})


router.patch('/update', auth.authenticateToken, checkRole.checkRole, (req, res, next) => {
    let product = req.body
    var query = "update category set name=? where id=?";
    connnection.query(query, [product.name, product.id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({
                    message: "Category id does not exist"
                })
            }
            return res.status(200).json({
                message: "Category updated Successfully"
            })
        } else {
            return res.status(500).json(err)
        }
    })
})


module.exports = router;