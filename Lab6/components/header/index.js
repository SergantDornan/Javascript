export class HeaderComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
            <div id="header" class="header">
                <h2>СтилевыйРемонт.ru</h2>
                <nav>
                    <ul class="buttons-position">
                        <button type="button" class="buttons-style" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Новейщие дизайны">
                        Новинки
                        </button>
                        <button type="button" class=" buttons-style" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Уникальные акции">
                        Акции
                        </button>
                        <button type="button" class="buttons-style" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Бешеные скидки">
                        Скидки
                        </button>
                        <button type="button" class="buttons-style" data-bs-container="body" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-content="Наивысшее качество">
                        Качесвто
                        </button>
                    </ul>
                </nav>
            </div>                
            `
        )
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
        const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    }
}