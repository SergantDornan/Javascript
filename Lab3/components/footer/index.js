export class FooterComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML() {
        return (
            `
            <div id="footer" class="footer">
                <h4>СтилевыйРемонт.ru</h4>
                <h6>Наш адрес: г. Москва, ул. Пушкинская, д. 1</h6>
                <h6>Наш телефон: +7 (495) 123-45-67</h6>
            </div>
            `
        )
    }

    render() {
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}