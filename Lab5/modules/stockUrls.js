class StockUrls {
    constructor() {
        this.baseUrl = 'http://localhost:7000';
    }

    getStocks(sortBy = null) {
        let url = `${this.baseUrl}/stocks`;
        if (sortBy) {
            url += `?sort=${sortBy}`; // Добавляем параметр сортировки
        }
        return url;
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();