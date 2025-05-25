export class AddDeleteButtons {
  constructor(parent) {
      this.parent = parent;
  }

  getHTML() {
      return `
          <div class="position_buttons_add_delete">
              <button class="buttons_add_delete" id="add-card-button">Добавить предложение</button>
              <button class="buttons_add_delete" id="delete-card-button">Удалить предложение</button>
          </div>
      `;
  }

  render(onAddClick, onDeleteClick) {
      const html = this.getHTML();
      this.parent.insertAdjacentHTML('beforeend', html);
      
      document.getElementById('add-card-button').addEventListener('click', onAddClick);
      document.getElementById('delete-card-button').addEventListener('click', onDeleteClick);
  }
}