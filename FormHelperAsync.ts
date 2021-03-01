
class FormHelperAsync extends FormHelper {
    
    /**
     * The async variant of the method in the base class
     * Waits async for the form validation to be finished
     */
    setupFormSubmit(){
        this._formElement.onsubmit = event => {
            this.onSubmit();
            if(this._preventSubmit){
                event.preventDefault();
            }
            this.validateFormAsync().then(isValid => {
                if(isValid){
                    this.onValid();
                    if(this._options.submitIfValid){
                        this.submitForm();
                    }
                }
                else{
                    this.onInvalid();
                }
            });
        }
    }
    
    
    /**
     * The async variant of the method in the base class
     * @returns {Promise} promise with the result of the form validation
     */
    private validateFormAsync(): Promise<boolean>{
        const values: any = {};
        const promises: Promise<void>[] = [];

        for(const prop in this._form){
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