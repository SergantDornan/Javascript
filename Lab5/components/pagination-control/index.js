// components/pagination-control/index.js
export class PaginationControlComponent {
    constructor(parent, onChange) {
        this.parent = parent;
        this.onChange = onChange;
        this.currentLimit = 10;
    }

    render() {
        const container = document.createElement('div');
        container.className = 'pagination-control';
        
        container.innerHTML = `
        <div class="pagination-position">
            <div class="input-group">
                <span class="input-group-text">Показывать:</span>
                <input type="number" 
                       class="form-control" 
                       min="1" 
                       value="${this.currentLimit}"
                       id="cards-limit-input">
                <button class="btn btn-outline-secondary" id="apply-limit-btn">Применить</button>
            </div>
        </div>
        `;
        
        const input = container.querySelector('#cards-limit-input');
        const button = container.querySelector('#apply-limit-btn');
        
        button.addEventListener('click', () => {
            const value = parseInt(input.value);
            if (!isNaN(value) && value > 0) {
                this.currentLimit = value;
                this.onChange(this.currentLimit);
            }
        });
        
        // Также можно реагировать на Enter
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                button.click();
            }
        });
        
        this.parent.appendChild(container);
    }

    getLimit() {
        return this.currentLimit;
    }
}