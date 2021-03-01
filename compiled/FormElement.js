class FormElement {
    constructor(...args) {
        this._isValid = true;
        this._errors = [];
        this._otherValues = {};
        this._validators = args;
    }
    validate() {
        this._errors = [];
        this._validators.forEach((validator) => {
            validator(this);
        });
        this._isValid = this.errors.length === 0;
        return this.isValid;
    }
    bindElement(elementId) {
        let element = document.querySelector(`#${elementId}`);
        if (element === null) {
            elementId = elementId.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
            element = document.querySelector(`#${elementId}`);
        }
        this.bindedElement = document.querySelector(`#${elementId}`);
    }
    get isValid() {
        return this._isValid;
    }
    get bindedElement() {
        return this._bindedElement;
    }
    set bindedElement(value) {
        this._bindedElement = value;
    }
    get errors() {
        return this._errors;
    }
    get otherValues() {
        return this._otherValues;
    }
    set otherValues(value) {
        this._otherValues = value;
    }
}
//# sourceMappingURL=FormElement.js.map