const {StocksService} = require('./StocksService');

class StocksController {
    static findStocks(req, res) {
        try {
            const stocks = StocksService.findStocks();
            if (req.query.sort === 'title') {
                stocks.sort((a, b) => a.title.localeCompare(b.title));
            }
            res.send(stocks);
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message});
        }
    }

    static findStockById(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(StocksService.findStocks(id))
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static addStock(req, res) {
        try {
            res.send(StocksService.addStock(req.body));
        } catch (err) {
            res.status(400).json({status: 'Bad Request', message: err.message})
        }
    }

    static deleteStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            res.send(StocksService.deleteStock(id));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }

    static updateStock(req, res) {
        try {
            const id = Number.parseInt(req.params.id);
            const updateData = req.body;
            res.send(StocksService.updateStock(id, updateData));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message})
        }
    }
}

module.exports = {
    StocksController,
};