const {StocksService} = require('./StocksService');

class StocksController {
    static findStocks(req, res) {
        try {
          const id = req.query.id ? Number.parseInt(req.query.id) : undefined; // Получаем id из req.query.id, если он есть
          const title = req.query.title; // Получаем title из req.query.title, если он есть
      
          const stocks = StocksService.findStocks(id, title); // Передаем id и title в StocksService
          res.send(stocks);
        } catch (err) {
          res.status(400).send({ status: 'Bad Request', message: err.message });
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

    static findStockByTitle(req, res) {
        try {
            const title = req.query.title;
            if (!title) {
                throw new Error('Title is required');
            }
            res.send(StocksService.findStockByTitle(title));
        } catch (err) {
            res.status(400).send({status: 'Bad Request', message: err.message});
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
}

module.exports = {
    StocksController,
};