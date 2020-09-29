class FormHelperAsync extends FormHelper {
    
    /**
     * The async variant of the method in the base class
     * Waits async for the form validation to be finished
     */
    setupFormSubmit(){
        this.formElement.onsubmit = event => {
            if(this.preventSubmit){
                event.preventDefault();
            }
            this.validateForm().then(isValid => {
                if(isValid){
                    this.onValid();
                    if(this.submitIfValid){
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
    validateForm(){
        const values = {};
        const promises = [];
        for(const prop in this.form){
            const formField = this.form[prop];
            formField.otherValues = values;
            values[prop] = formField.value; 
            promises.push(Promise.resolve(formField.validate()));
        }

        return Promise.allSettled(promises).then(results => {
            for(let i = 0; i < results.length; i++){
                const result = results[i].value;
                if(! result){
                    return false;
                }
            }
            return true;
        });

    }


}