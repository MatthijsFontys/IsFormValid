class FormHelper {
    constructor(form, customOptions = {}) {
        this._preventSubmit = true;
        this._form = form;
        this._formFields = [];
        this.setupOptions(customOptions);
        this._formLogger = FormLogger.initInstance(this._options.debug);
        this.setupForm(form);
        this.setupFormFieldDatabBinding();
        this.setupFormSubmit();
        this.debugLog("To disable debugging\npass the option debug: false, to the formHelper.");
    }
    validateForm() {
        const values = {};
        let isFormValid = true;
        for (const prop in this._form) {
            const formField = this._form[prop];
            formField.otherValues = values;
            values[prop] = formField.value;
            formField.validate();
            if (formField.errors.length > 0) {
                isFormValid = false;
            }
            this.afterFieldValidation(formField);
        }
        return isFormValid;
    }
    clearForm() {
        this._formFields.forEach(formField => {
            formField.clear();
        });
    }
    get errors() {
        const toReturn = [];
        this._formFields.forEach(formField => {
            toReturn.push.apply(toReturn, formField.errors);
        });
        this.debugLog(`${toReturn.length} errors found in the form.`);
        return toReturn;
    }
    onValid() {
        this.debugLog('The form is valid.');
    }
    onInvalid() {
        this.debugLog('The form is not valid!');
    }
    onSubmit() {
        this.debugLog('Submitting the form');
    }
    submitForm() {
        this._preventSubmit = false;
        this._formElement.submit();
        this._preventSubmit = true;
    }
    setupForm(form) {
        this._formElement = document.querySelector(`#${form.id}`);
        delete form.id;
    }
    setupFormFieldDatabBinding() {
        for (const prop in this._form) {
            const formField = this._form[prop];
            this._formFields.push(formField);
            formField.bindElement(prop);
        }
    }
    setupOptions(options) {
        this._options = new FormHelperOptions();
        this._options = { ...this._options, ...options };
    }
    setupFormSubmit() {
        this._formElement.onsubmit = event => {
            this.onSubmit();
            if (this._preventSubmit) {
                event.preventDefault();
            }
            if (this.validateForm()) {
                this.onValid();
                if (this._options.submitIfValid) {
                    this.submitForm();
                }
            }
            else {
                this.onInvalid();
            }
        };
    }
    afterFieldValidation(formField) {
        if (formField.errors.length === 0)
            this.afterFieldValid(formField);
        else
            this.afterFieldInvalid(formField);
    }
    afterFieldValid(formField) {
        formField.bindedElement.classList.add(this._options.validClassName);
        formField.bindedElement.classList.remove(this._options.invalidClassName);
    }
    afterFieldInvalid(formField) {
        formField.bindedElement.classList.add(this._options.invalidClassName);
        formField.bindedElement.classList.remove(this._options.validClassName);
    }
    debugLog(message) {
        this._formLogger.debugLog(message);
    }
    debugTable(message) {
        this._formLogger.debugTable(message);
    }
}
//# sourceMappingURL=FormHelper.js.map