const {StockDAO} = require('./StocksDAO');

class StocksService {
    static findStocks(id, title) {
        let stocks = StockDAO.find(); // Получаем все stocks
    
        if (id !== undefined) {
            stocks = stocks.filter(stock => stock.id === id); // Фильтруем по id
        }
    
        if (title) {
            stocks = stocks.filter(stock => stock.title.toLowerCase().includes(title.toLowerCase())); // Фильтруем по title
        }
    
        return stocks.map((stock) => stock.toJSON()); // Преобразуем в JSON
    }
    

    static addStock(stock) {
        return StockDAO.insert(stock).toJSON();
    }

    static deleteStock(id) {
        return StockDAO.delete(id).map((stock) => stock.toJSON());
    }
}

module.exports = {
    StocksService,
}