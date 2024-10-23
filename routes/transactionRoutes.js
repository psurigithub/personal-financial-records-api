const express = require('express');
const router = express.Router();


const {
    getAllTransactions,
    getTransactionById,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getSummary
} = require('../controllers/transactionController');

router.post('/', addTransaction);           
router.get('/', getAllTransactions);             
router.get('/:id', getTransactionById);         
router.put('/:id', updateTransaction);           
router.delete('/:id', deleteTransaction);         
router.get('/summary', getSummary);               


module.exports = router;
