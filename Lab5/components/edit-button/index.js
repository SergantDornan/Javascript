// components/edit-button/index.js
export class EditButtonComponent {
    constructor(parent, onClick) {
        this.parent = parent;
        this.onClick = onClick;
    }

    render() {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-primary', 'mb-3', 'edit-button-position');
        button.textContent = 'Изменить предложение';
        button.addEventListener('click', this.onClick);
        this.parent.appendChild(button);
    }
}