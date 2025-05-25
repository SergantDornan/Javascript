// pages/main/index.js
import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {FooterComponent} from "../../components/footer/index.js";
import {ajax} from "../../modules/ajax.js";
import {stockUrls} from "../../modules/stockUrls.js";
import { AddButtonComponent } from "../../components/create-button/index.js";
import { AddModalComponent } from "../../components/create-modal/index.js";
import { EditButtonComponent } from "../../components/edit-button/index.js";
import { EditModalComponent } from "../../components/edit-modal/index.js";
import { PaginationControlComponent } from "../../components/pagination-control/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.limit = 10;
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }
        
    getHTML() {
        return `
            <div id="main-container">
                <div id="header"></div>
                <div class="controls-panel">
                    <div id="action-buttons"></div>
                    <div id="pagination-control"></div>
                </div>
                <div id="main-page" class="d-flex flex-wrap wrapper"></div>
                <div id="footer"></div>
            </div>
        `;
    }

    getData() {
        ajax.get(stockUrls.getStocks('title'), (data) => {
            this.renderData(data);
        });
    }

    renderData(items) {
        const pageRoot = document.getElementById('main-page');
        pageRoot.innerHTML = '';
        
        items.slice(0, this.limit).forEach((item) => {
            const productCard = new ProductCardComponent(pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }
    
    clickCard(e) {
        const cardId = e.target.dataset.id    
        const productPage = new ProductPage(this.parent, cardId)
        productPage.render()
    }

    showAddModal() {
        const modal = new AddModalComponent(this.parent);
        modal.render();
        const modalElement = document.getElementById(modal.modalId);
        const bsModal = new bootstrap.Modal(modalElement);
        bsModal.show();
    }
    
    showEditModal() {
        const modal = new EditModalComponent(this.parent, (id, data) => {
            this.handleEdit(id, data);
        });
        modal.render();
        const modalElement = document.getElementById(modal.modalId);
        const bsModal = new bootstrap.Modal(modalElement);
        bsModal.show();
    }
    
    handleEdit(id, data) {
        ajax.patch(stockUrls.updateStockById(id), data, (response, status) => {
            if (status === 200) {
                // Refresh data after successful update
                this.pageRoot.innerHTML = '';
                this.getData();
                alert('Stock updated successfully!');
            } else {
                alert('Error updating stock');
            }
        });
    }
    
    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        // Рендерим хедер
        const header = new HeaderComponent(document.getElementById('header'));
        header.render();

        // Рендерим кнопки действий
        const actionButtons = document.getElementById('action-buttons');
        const addButton = new AddButtonComponent(actionButtons, this.showAddModal.bind(this));
        addButton.render();
        const editButton = new EditButtonComponent(actionButtons, this.showEditModal.bind(this));
        editButton.render();

        // Рендерим пагинацию с возможностью ввода числа
        const paginationControl = new PaginationControlComponent(
            document.getElementById('pagination-control'),
            (newLimit) => {
                this.limit = newLimit;
                this.getData();
            }
        );
        paginationControl.render();

        // Рендерим футер
        setTimeout(() => {
            const footer = new FooterComponent(document.getElementById('footer'));
            footer.render();
        }, 10);

        this.getData();
    }
}