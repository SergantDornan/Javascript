export class DeleteButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    getHTML() {
        return `
            <button class="buttons-style delete-button" type="button">
                Удалить предложение
            </button>
        `;
    }

    render() {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        
        const deleteButton = this.parent.querySelector('.delete-button');
        deleteButton.addEventListener('click', this.onClick);
    }
}