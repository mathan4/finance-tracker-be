const express = require('express')
const router = express.Router()
const {getAllTransactions,addNewTransaction, deleteTransaction}=require('../controllers/transactionController')

router.route('/').get(getAllTransactions)

router.route('/add').post(addNewTransaction)

router.route('/delete/:id').delete(deleteTransaction)

module.exports=router