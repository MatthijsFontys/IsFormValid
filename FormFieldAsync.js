
/**
 * Async version of the regular FormField
 * To be used when there is async validation for the form field.
 */
class FormFieldAsync extends FormField {

    /**
     * The async variant of the method in the base class
     * @returns {Promise} promise with the validation result
     */
    validate(){
        const promises = [];
        this.errors = [];
        this.validators.forEach(validate => {
            promises.push(Promise.resolve(validate(this)));
        });
        
        return Promise.allSettled(promises).then(() => {
            this.isValid = this.errors.length === 0;
            return this.isValid;
        });
    }
}

