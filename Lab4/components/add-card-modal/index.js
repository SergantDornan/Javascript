export class AddCardModal {
    constructor(parent, onSubmit) {
        this.parent = parent;
        this.onSubmit = onSubmit;
        this.modalElement = null;
        this.isInitialized = false;
    }

    init() {
        if (this.isInitialized) return;
        
        this.modalElement = document.createElement('div');
        this.modalElement.className = 'modal';
        this.modalElement.style.display = 'none';
        this.modalElement.innerHTML = `
            <div class="modal-content">
                <span class="close">&times;</span>
                <h2>Добавить новое дизайнерское решение</h2>
                <form id="card-form">
                    <div class="form-group">
                        <label for="card-title">Заголовок:</label>
                        <input type="text" id="card-title" required>
                    </div>
                    <div class="form-group">
                        <label for="card-text">Краткое описание:</label>
                        <textarea id="card-text" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="card-description">Полное описание:</label>
                        <textarea id="card-description" rows="4" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="card-src">URL изображения:</label>
                        <input type="url" id="card-src" required>
                    </div>
                    <div class="form-actions">
                        <button type="submit" class="submit-btn">Добавить</button>
                        <button type="button" class="cancel-btn">Отмена</button>
                    </div>
                </form>
            </div>
        `;

        this.parent.appendChild(this.modalElement);

        const closeBtn = this.modalElement.querySelector('.close');
        const form = this.modalElement.querySelector('#card-form');
        const cancelBtn = this.modalElement.querySelector('.cancel-btn');

        closeBtn.onclick = () => this.hide();
        cancelBtn.onclick = () => this.hide();
        form.onsubmit = (e) => {
            e.preventDefault();
            const title = this.modalElement.querySelector('#card-title').value;
            const text = this.modalElement.querySelector('#card-text').value;
            const description = this.modalElement.querySelector('#card-description').value;
            const src = this.modalElement.querySelector('#card-src').value;
            this.onSubmit({ title, text, big_text: description, src });
            this.hide();
            form.reset();
        };

        this.isInitialized = true;
    }

    show() {
        if (!this.isInitialized) this.init();
        this.modalElement.style.display = 'block';
    }

    hide() {
        if (this.modalElement) {
            this.modalElement.style.display = 'none';
        }
    }
}