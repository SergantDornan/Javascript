export class AddButtonComponent {
    constructor(parent, callback) {
        this.parent = parent;
        this.callback = callback;
    }

    render() {
        const button = document.createElement('button');
        button.textContent = 'Добавить предложение';
        button.className = 'btn btn-primary mb-3 create-button-position';
        button.style.marginLeft = '10px';
        button.addEventListener('click', this.callback);
        
        this.parent.appendChild(button);
    }
}