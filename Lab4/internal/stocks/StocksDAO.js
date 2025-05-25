const {StocksRepository} = require('./StocksRepository');

class StockDAO {
    constructor(id, src, title, text, big_text) {
        this.id = id;
        this.src = src;
        this.title = title;
        this.text = text;
        this.big_text = big_text;
    }

    static _validateId(id) {
        const numberId = Number.parseInt(id);
        if (Number.isNaN(numberId)) {
            throw new Error('invalidate id');
        }
    }

    static _validate(stock) {
        if (
            stock.id === undefined ||
            stock.src === undefined ||
            stock.title === undefined ||
            stock.text === undefined ||
            stock.big_text === undefined
        ) {
            throw new Error('invalidate stock data');
        }

        this._validateId(stock.id);
    }

    
    static find() {
        const stocks = StocksRepository.read();
    
        return stocks.map(({ id, src, title, text, big_text }) => {
          return new this(id, src, title, text, big_text);
        });
      }


    static findByTitle(title) {
        const stocks = StocksRepository.read();
        const filteredStocks = stocks.filter((s) => s.title.toLowerCase().includes(title.toLowerCase()));

        return filteredStocks.map(({id, src, title, text, big_text}) => {
            return new this(id, src, title, text, big_text);
        });
    }

    static findById(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const stock = stocks.find((s) => s.id === id);

        return new this(stock.id, stock.src, stock.title, stock.text, stock.big_text);
    }

    static insert(stock) {
        this._validate(stock);

        const stocks = StocksRepository.read();
        StocksRepository.write([...stocks, stock]);

        return new this(stock.id, stock.src, stock.title, stock.text, stock.big_text);
    }

    static delete(id) {
        this._validateId(id);

        const stocks = StocksRepository.read();
        const filteredStocks = stocks.filter((s) => s.id !== id);

        StocksRepository.write(filteredStocks);

        return filteredStocks.map(({id, src, title, text, big_text}) => {
            return new this(id, src, title, text, big_text);
        });
    }

    toJSON() {
        return {
            id: this.id,
            src: this.src,
            title: this.title,
            text: this.text,
            big_text: this.big_text,
        }
    }
}

module.exports = {
    StockDAO,
}