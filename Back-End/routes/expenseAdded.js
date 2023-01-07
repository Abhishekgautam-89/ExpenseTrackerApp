const express = require('express');
const router = express.Router();
const getexpenseController = require('../controller/expenses')

router.get('/expense',getexpenseController.getExpense);
router.post('/expense',getexpenseController.addExpense);
router.delete('/delete/:id',getexpenseController.deleteExpense);
router.put('/edit/:id',getexpenseController.updateExpense)

module.exports = router