class FormHelperAsync extends FormHelper {
    setupFormSubmit() {
        this._formElement.onsubmit = event => {
            this.onSubmit();
            if (this._preventSubmit) {
                event.preventDefault();
            }
            this.validateFormAsync().then(isValid => {
                if (isValid) {
                    this.onValid();
                    if (this._options.submitIfValid) {
                        this.submitForm();
                    }
                }
                else {
                    this.onInvalid();
                }
            });
        };
    }
    validateFormAsync() {
        const values = {};
        const promises = [];
        for (const prop in this._form) {
            const formField = this._form[prop];
            formField.otherValues = values;
            values[prop] = formField.value;
            promises.push(Promise.resolve(formField.validate()));
        }
        return Promise.allSettled(promises).then(results => {
            this._formFields.forEach(formField => {
                this.afterFieldValidation(formField);
            });
            return results.every(r => r.status === 'fulfilled' && r.value);
        });
    }
}
//# sourceMappingURL=FormHelperAsync.js.map