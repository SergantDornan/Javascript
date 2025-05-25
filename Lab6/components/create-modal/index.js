import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class AddModalComponent {
    constructor(parent) {
        this.parent = parent;
        this.modalId = 'addStockModal';
        this.availableIds = []; // Массив для хранения доступных ID (если нужно)
    }

    getHTML() {
        return `
            <div class="modal fade" id="${this.modalId}" tabindex="-1" aria-labelledby="addStockModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="addStockModalLabel">Добавить новое предложение</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="addStockForm">
                                <div class="mb-3">
                                    <label for="stockTitle" class="form-label">Название*</label>
                                    <input type="text" class="form-control" id="stockTitle" required minlength="2">
                                </div>
                                <div class="mb-3">
                                    <label for="stockText" class="form-label">Краткое описание*</label>
                                    <input type="text" class="form-control" id="stockText" required minlength="5">
                                </div>
                                <div class="mb-3">
                                    <label for="stockBigText" class="form-label">Полное описание*</label>
                                    <textarea class="form-control" id="stockBigText" rows="3" required minlength="10"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="stockSrc" class="form-label">Ссылка на изображение*</label>
                                    <input type="url" class="form-control" id="stockSrc" required>
                                    <div class="form-text">Укажите полный URL изображения (начинается с http:// или https://)</div>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button" class="btn btn-primary" id="saveStockBtn">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    async getAvailableId() {
        try {
            // Сначала проверяем, есть ли доступные ID в массиве
            if (this.availableIds.length > 0) {
                return this.availableIds.shift();
            }

            // Если нет, запрашиваем данные с сервера
            const data = await new Promise((resolve, reject) => {
                ajax.get(stockUrls.getStocks(), (response, status) => {
                    if (status >= 200 && status < 300) {
                        resolve(response);
                    } else {
                        reject(new Error('Ошибка при получении данных'));
                    }
                });
            });

            // Находим максимальный ID и возвращаем следующий
            const maxId = Math.max(...data.map(item => item.id));
            return maxId + 1;
        } catch (error) {
            console.error('Ошибка при получении ID:', error);
            // Возвращаем временный ID, если не удалось получить с сервера
            return Date.now(); // Используем timestamp как временное решение
        }
    }

    async handleSave() {
        const title = document.getElementById('stockTitle').value.trim();
        const text = document.getElementById('stockText').value.trim();
        const big_text = document.getElementById('stockBigText').value.trim();
        const src = document.getElementById('stockSrc').value.trim();

        // Валидация данных
        if (!title || !text || !big_text || !src) {
            alert('Пожалуйста, заполните все обязательные поля (помечены *)');
            return;
        }

        if (!src.startsWith('http://') && !src.startsWith('https://')) {
            alert('Ссылка на изображение должна начинаться с http:// или https://');
            return;
        }

        try {
            // Получаем новый ID
            const id = await this.getAvailableId();

            const data = {
                id: id,
                title: title,
                text: text,
                big_text: big_text,
                src: src
            };

            console.log('Отправляемые данные:', data);

            ajax.post(stockUrls.createStock(), data, (response, status) => {
                if (status >= 200 && status < 300) {
                    const modalElement = document.getElementById(this.modalId);
                    const modal = bootstrap.Modal.getInstance(modalElement);
                    modal.hide();
                    window.location.reload();
                } else {
                    alert(`Ошибка при сохранении: ${status}`);
                    if (response && response.message) {
                        console.error('Сообщение об ошибке:', response.message);
                    }
                }
            });
        } catch (error) {
            console.error('Ошибка при сохранении карточки:', error);
            alert('Произошла ошибка при создании карточки');
        }
    }

    render() {
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        document.getElementById('saveStockBtn').addEventListener('click', () => {
            this.handleSave().catch(error => {
                console.error('Ошибка:', error);
            });
        });
    }
}