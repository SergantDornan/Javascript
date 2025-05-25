const {StockDAO} = require('./StocksDAO');

class StocksService {
    static findStocks(id) {
        if (id !== undefined) {
            return StockDAO.findById(id).toJSON();
        }

        return StockDAO.find().map((stock) => stock.toJSON());
    }

    static addStock(stock) {
        return StockDAO.insert(stock).toJSON();
    }

    static deleteStock(id) {
        return StockDAO.delete(id).map((stock) => stock.toJSON());
    }

    static updateStock(id, updateData) {
        // Здесь нужно реализовать логику обновления
        // Например, получить текущие данные, объединить с новыми и сохранить
        const current = StockDAO.findById(id).toJSON();
        const updated = {...current, ...updateData};
        StockDAO.delete(id);
        return StockDAO.insert(updated).toJSON();
    }
}

module.exports = {
    StocksService,
}