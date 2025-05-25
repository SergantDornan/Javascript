import {ProductCardComponent} from "../../components/product-card/index.js";
import {ProductPage} from "../product/index.js";
import {HeaderComponent} from "../../components/header/index.js";
import {FooterComponent} from "../../components/footer/index.js";
import {AddDeleteButtons} from "../../components/add-delete-buttons/index.js";
import {AddCardModal} from "../../components/add-card-modal/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.modal = new AddCardModal(this.parent, this.handleCardSubmit.bind(this));
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
        return fetch('http://localhost:7000/stocks')
          .then(response => response.json())
          .then(data => {
            this.availableIds = [];
            const ids = data.map(item => item.id);
            for (let i = 1; i <= Math.max(...ids); i++) {
              if (!ids.includes(i)) {
                this.availableIds.push(i);
              }
            }
            return data;
        });
    }

    getAvailableId() {
        return new Promise((resolve, reject) => {
          if (this.availableIds.length > 0) {
            resolve(this.availableIds.shift());
          } else {
            this.getData().then(data => {
              const maxId = Math.max(...data.map(item => item.id));
              resolve(maxId + 1);
            }).catch(error => {
              reject(error);
            });
          }
        });
      }

    handleCardSubmit(cardData) {
        this.getAvailableId().then(id => {
            const completeCardData = { ...cardData, id };
            
            fetch('http://localhost:7000/stocks', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(completeCardData)
            })
            .then(response => {
                if (!response.ok) throw new Error(`Ошибка ${response.status}`);
                return response.json();
            })
            .then(data => {
                console.log('Карточка добавлена:', data);
                this.render();
            })
            .catch(error => {
                console.error('Ошибка:', error);
                alert('Не удалось добавить карточку');
            });
        }).catch(error => {
            console.error('Ошибка:', error);
            alert('Не удалось получить ID для новой карточки');
        });
    }
    
    deleteCard() {
        const id = prompt('Введите ID карточки для удаления:');
        fetch(`http://localhost:7000/stocks/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => {
            console.log('Карточка удалена:', data);
            if (!this.availableIds.includes(id)) {
            this.availableIds.push(id);
            this.availableIds.sort((a, b) => a - b);
            }
            this.render();
        })
        .catch(error => {
            console.error('Ошибка:', error);
        });
    }
    
    async clickCard(e) {
        const cardId = e.target.dataset.id;
        const data = await this.getData();
        const itemData = data.find(item => item.id === parseInt(cardId));
        const productPage = new ProductPage(this.parent, cardId, itemData);
        productPage.render();
    }  
    
    render() {
        this.parent.innerHTML = '';
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const header = new HeaderComponent(this.pageRoot);
        header.render();

        const buttonsAddDelete = new AddDeleteButtons(this.pageRoot);
        buttonsAddDelete.render(
            () => {
                this.modal.show(); // Теперь это точно сработает
            },
            this.deleteCard.bind(this)
        );

        this.getData().then(data => {
            data.forEach((item) => {
                const productCard = new ProductCardComponent(this.pageRoot);
                productCard.render(item, this.clickCard.bind(this));
            });
            const footer = new FooterComponent(this.pageRoot);
            footer.render();
        });
    }
}

// getData() {
//     return [
//         {
//             id: 1,
//             src: "https://media.contented.ru/wp-content/uploads/2024/08/1-4.webp",
//             title: "Скандинавский стиль",
//             text: "Он сдержанный и в то же время уютный. Тепло и спокойствие.",
//             big_text: "Скандинавский стиль появился в Северной Европе и распространился по миру благодаря компании IKEA. Он сдержанный и в то же время уютный. В основе стиля лежит скандинавская философия хюгге. Хюгге — это ощущение уюта, теплое чувство физического и духовного комфорта. "

//         },
//         {
//             id: 2,
//             src: "https://media.contented.ru/wp-content/uploads/2024/08/5.jpeg",
//             title: "Минимализм",
//             text: "Простор, свобода и широта. Откажись от всего ненужного.",
//             big_text: "Минимализм — современный стиль, который берет истоки в японском стиле в сочетании с философией отрицания перепотребления. Минимализм не подойдет, если в квартире много вещей и не получается обходиться малым. Простор в минимализме достигается размерами помещений и отсутствием вещей не только на открытых поверхностях, но и в местах хранения."
//         },
//         {
//             id: 3,
//             src: "https://media.contented.ru/wp-content/uploads/2024/08/9-1.jpg",
//             title: "Джапанди",
//             text: "Минималистичные черты и текстуры японского стиля.",
//             big_text: "Джапанди появился сравнительно недавно как симбиоз скандинавского и японского стилей. Он сочетает в себе минималистичные черты и натуральные текстуры японского и простоту скандинавского стиля. "    
//         },
//     ]
// }
