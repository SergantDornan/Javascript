import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {FooterComponent} from "../../components/footer/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return (
            `
                <div id="header"></div>
                <div id="main-page" class="d-flex flex-wrap wrapper"><div/>
                <div id="footer"></div>
            `
        )
    }

    getData() {
        return [
            {
                id: 1,
                src: "https://media.contented.ru/wp-content/uploads/2024/08/1-4.webp",
                title: "Скандинавский стиль",
                text: "Он сдержанный и в то же время уютный. Тепло и спокойствие."
            },
            {
                id: 2,
                src: "https://media.contented.ru/wp-content/uploads/2024/08/5.jpeg",
                title: "Минимализм",
                text: "Простор, свобода и широта. Откажись от всего ненужного."
            },
            {
                id: 3,
                src: "https://media.contented.ru/wp-content/uploads/2024/08/9-1.jpg",
                title: "Джапанди",
                text: "Минималистичные черты и текстуры японского стиля."
            },
        ]
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id
    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }
    
    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const header = new HeaderComponent(this.pageRoot)
        header.render()
        
        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this)) 
        })

        const footer = new FooterComponent(this.pageRoot)
        footer.render()
    }
}
