class Rule {
  constructor(name = "Geronimo") {
    this._name = name;
    this._items = [];
  }

  get name() {
    return this._name;
  }

  get items() {
    return this._items;
  }

  add(items) {
    this._items = this._items.concat(items);
    return this;
  }

  loneWolf() {
    return false;
  }

  validate() {
    throw new Error("Must implement");
  }
}

export default Rule;
