const express = require('express');
const {StocksController} = require('./StocksController');

const router = express.Router();

router.patch('/:id', StocksController.updateStock);
router.get('/', StocksController.findStocks);
router.get('/:id', StocksController.findStockById);
router.post('/', StocksController.addStock);
router.delete('/:id', StocksController.deleteStock);

module.exports = router;