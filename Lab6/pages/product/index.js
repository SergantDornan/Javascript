import {ProductComponent} from "../../components/product/index.js";
import {BackButtonComponent} from "../../components/back-button/index.js";
import {DeleteButtonComponent} from "../../components/delete-button/index.js";
import {MainPage} from "../main/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {FooterComponent} from "../../components/footer/index.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;
    }

    getData() {
        ajax.get(stockUrls.getStockById(this.id), (data) => {
            this.renderData(data);
        });
    }

    deleteData() {
        if (confirm("Вы уверены, что хотите удалить эту карточку?")) {
            ajax.delete(stockUrls.removeStockById(this.id), (data, status) => {
                if (status === 200) {
                    alert("Карточка успешно удалена");
                    this.clickBack();
                } else {
                    alert("Ошибка при удалении карточки");
                }
            });
        }
    }

    renderData(item) {
        const product = new ProductComponent(this.pageRoot);
        product.render(item);
        
        const deleteButton = new DeleteButtonComponent(
            this.pageRoot,
            this.deleteData.bind(this)
        );
        deleteButton.render();
    }

    get pageRoot() {
        return document.getElementById('product-page');
    }

    getHTML() {
        return (
            `
                <div id="header"></div>
                <div id="product-page" class="product-page"></div>
                <div id="footer"></div>
            `
        );
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(this.pageRoot);
        header.render();
    
        const backButton = new BackButtonComponent(this.pageRoot);
        backButton.render(this.clickBack.bind(this));
        
        setTimeout(() => {
            const footer = new FooterComponent(this.pageRoot);
            footer.render();
        }, 10);
    
        this.getData();
    }
}