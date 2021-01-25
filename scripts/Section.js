class Section {
  constructor({ items, renderer }, elementsGrid) {
    this._items = items;
    this._renderer = renderer;
    this._elementsGrid = elementsGrid;
  }

  // Метод отрисовки карточек
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Метод добавления карточки в контейнер
  addItem(element) {
    this._elementsGrid.prepend(element);
  }

}

export { Section };
