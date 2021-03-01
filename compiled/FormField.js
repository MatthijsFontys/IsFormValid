class FormField extends FormElement {
    constructor(...args) {
        super(...args);
    }
    get value() {
        return this.bindedElement.value;
    }
    set value(val) {
        this.bindedElement.value = val;
    }
    clear() {
        this.value = '';
    }
}
//# sourceMappingURL=FormField.js.map