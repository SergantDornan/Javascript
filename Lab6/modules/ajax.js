class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async get(url, callback) {
        try {
            const response = await fetch(url);
            const data = await this._parseResponse(response);
            callback(data, response.status);
        } catch (error) {
            console.error('GET request failed:', error);
            callback(null, 500);
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async post(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await this._parseResponse(response);
            callback(responseData, response.status);
        } catch (error) {
            console.error('POST request failed:', error);
            callback(null, 500);
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async patch(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            const responseData = await this._parseResponse(response);
            callback(responseData, response.status);
        } catch (error) {
            console.error('PATCH request failed:', error);
            callback(null, 500);
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async delete(url, callback) {
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            const responseData = await this._parseResponse(response);
            callback(responseData, response.status);
        } catch (error) {
            console.error('DELETE request failed:', error);
            callback(null, 500);
        }
    }

    /**
     * Парсинг ответа (приватный метод)
     * @param {Response} response - Объект ответа
     * @returns {Promise<object|null>} Распарсенные данные или null
     */
    async _parseResponse(response) {
        try {
            const text = await response.text();
            return text ? JSON.parse(text) : null;
        } catch (e) {
            console.error('Ошибка парсинга JSON:', e);
            return null;
        }
    }
}

export const ajax = new Ajax();