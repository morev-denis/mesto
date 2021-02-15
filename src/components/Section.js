export default class Section {
  constructor({ renderer }, elementsGrid) {
    // this._items = items;
    this._renderer = renderer;
    this._elementsGrid = elementsGrid;
  }

  // Метод отрисовки карточек
  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Метод добавления карточки в контейнер
  addItem(element) {
    this._elementsGrid.prepend(element);
  }
}
