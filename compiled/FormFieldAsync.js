class FormFieldAsync extends FormField {
    validate() {
        const promises = [];
        this._errors = [];
        this._validators.forEach(validate => {
            promises.push(Promise.resolve(validate(this)));
        });
        return Promise.allSettled(promises).then(() => {
            this._isValid = this.errors.length === 0;
            return this.isValid;
        });
    }
}
//# sourceMappingURL=FormFieldAsync.js.map