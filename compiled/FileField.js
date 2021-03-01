class FileField extends FormElement {
    constructor(...args) {
        super(...args);
    }
    get value() {
        return this.bindedElement.files;
    }
    set value(val) {
        this.bindedElement.files = val;
    }
    clear() {
        this.bindedElement.value = null;
    }
}
//# sourceMappingURL=FileField.js.map