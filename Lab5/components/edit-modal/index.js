// components/edit-modal/index.js
export class EditModalComponent {
    constructor(parent, onSubmit) {
        this.parent = parent;
        this.onSubmit = onSubmit;
        this.modalId = 'editModal';
    }

    render() {
        const modalHTML = `
            <div class="modal fade" id="${this.modalId}" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="editModalLabel">Изменить предложение</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form id="editForm">
                                <div class="mb-3">
                                    <label for="editId" class="form-label">Номер предложения*</label>
                                    <input type="number" class="form-control" id="editId" required>
                                </div>
                                <div class="mb-3">
                                    <label for="editTitle" class="form-label">Название*</label>
                                    <input type="text" class="form-control" id="editTitle">
                                </div>
                                <div class="mb-3">
                                    <label for="editText" class="form-label">Краткое описание*</label>
                                    <input type="text" class="form-control" id="editText">
                                </div>
                                <div class="mb-3">
                                    <label for="editBigText" class="form-label">Полное описание*</label>
                                    <textarea class="form-control" id="editBigText" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="editSrc" class="form-label">Ссылка на изображение*</label>
                                    <input type="text" class="form-control" id="editSrc">
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                            <button type="button" class="btn btn-primary" id="editSubmit">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.parent.insertAdjacentHTML('beforeend', modalHTML);
        
        document.getElementById('editSubmit').addEventListener('click', () => {
            const id = parseInt(document.getElementById('editId').value);
            const data = {};
            
            const src = document.getElementById('editSrc').value;
            if (src) data.src = src;
            
            const title = document.getElementById('editTitle').value;
            if (title) data.title = title;
            
            const text = document.getElementById('editText').value;
            if (text) data.text = text;
            
            const bigText = document.getElementById('editBigText').value;
            if (bigText) data.big_text = bigText;
            
            this.onSubmit(id, data);
            
            // Close modal
            const modalElement = document.getElementById(this.modalId);
            const bsModal = bootstrap.Modal.getInstance(modalElement);
            bsModal.hide();
        });
    }
}