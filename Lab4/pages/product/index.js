import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {MainPage} from "../main/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {FooterComponent} from "../../components/footer/index.js";

export class ProductPage {
    constructor(parent, id, itemData = null) {
        this.parent = parent
        this.id = id
        this.itemData = itemData
    }

    getData() {
        if (this.itemData) {
            return this.itemData;
        }
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
                <div id="header"></div>
                <div id="product-page" class="product-page"></div>
                <div id="footer"></div>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const header = new HeaderComponent(this.pageRoot)
        header.render()
    
        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))
    
        const data = this.getData()
        const stock = new ProductComponent(this.pageRoot)
        stock.render(data)

        const footer = new FooterComponent(this.pageRoot)
        footer.render()
    }
}

// switch(this.id) {
//     case "1":
//         return {
//             id: 1,
//             src: "https://media.contented.ru/wp-content/uploads/2024/08/1-4.webp",
//             title: "Скандинавский стиль",
//             big_text: "Скандинавский стиль появился в Северной Европе и распространился по миру благодаря компании IKEA. Он сдержанный и в то же время уютный. В основе стиля лежит скандинавская философия хюгге. Хюгге — это ощущение уюта, теплое чувство физического и духовного комфорта. "
//         };
//     case "2":
//         return {
//             id: 2,
//             src: "https://media.contented.ru/wp-content/uploads/2024/08/5.jpeg",
//             title: "Минимализм",
//             big_text: "Минимализм — современный стиль, который берет истоки в японском стиле в сочетании с философией отрицания перепотребления. Минимализм не подойдет, если в квартире много вещей и не получается обходиться малым. Простор в минимализме достигается размерами помещений и отсутствием вещей не только на открытых поверхностях, но и в местах хранения."
//         };
//     case "3":
//         return {
//             id: 3,
//             src: "https://media.contented.ru/wp-content/uploads/2024/08/9-1.jpg",
//             title: "Джапанди",
//             big_text: "Джапанди появился сравнительно недавно как симбиоз скандинавского и японского стилей. Он сочетает в себе минималистичные черты и натуральные текстуры японского и простоту скандинавского стиля. "    
//         };
//     default:
//         return {
//             id: this.id,
//             src: "default.jpg",
//             title: `Акция ${this.id}`,
//             big_text: "Стандартное описание"
//         };
// }
