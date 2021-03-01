
/**
 * Async version of the regular FormField
 * To be used when there is async validation for the form field.
 */
class FormFieldAsync extends FormField {

    /**
     * The async variant of the method in the base class
     * @returns {Promise} promise with the validation result
     */
    validate(): Promise<boolean> | boolean{
        const promises: Promise<boolean>[] = [];
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

