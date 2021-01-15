/**
 * Class for validating and helping function for a form
 */
class FormHelper{

    /**
     * @param {Object} form - the form to handle
     * @param {Boolean} submitIfValid - should the helper submit when valid in onsubmit
     */
    constructor(form, options = {}){        
        // Toggle for submitting the form without preventing default behaviour
        this.preventSubmit = true;

        // Setup
        this.formFields = []; // All form fields to loop through
        this.setupOptions(options);
        this.setupForm(form);
        this.setupFormFieldDatabBinding();
        this.setupFormSubmit();

        this.debugLog("To disable debugging\npass the option debug: false, to the formHelper.");

    }

    setupOptions(options){
        // Options
        this.options = {
            validClassName: "valid",
            invalidClassName: "invalid",
            debug: false,
            submitIfValid: false
        }
        this.options = {...this.options, ...options};

        this.submitIfValid = this.options.submitIfValid;
    }

    /**
     * Validates the form and shares necessary form values
     * @returns {Boolean} true if there are no errors in the entire form - false otherwise
     */
    validateForm(){
        const values = {};
        let isFormValid = true;
        for(const prop in this.form){
            const formField = this.form[prop];
            formField.otherValues = values;
            values[prop] = formField.value; 
            formField.validate();
            // Don't cancel early, so all errors can be generated.
            if(formField.errors.length > 0){
                isFormValid = false;
            }
            this.afterFieldValidation(formField);
        }
        return isFormValid;
    }
    

    /**
     * Empties all form values
     */
    clearForm(){
        this.formFields.forEach(formField => {
          formField.clear();  
        });
    }

    /**
     * Sets up the form and gets the form element from the DOM
     * @param {Object} form - the form object with formfields 
     */
    setupForm(form){
        this.form = form;
        this.formElement = document.querySelector(`#${this.form.id}`);
        delete form.id;
    }

    /**
     * Sets the element to databind for all the form fields
     */
    setupFormFieldDatabBinding(){
        for(const prop in this.form){
            const formField = this.form[prop]; 
            this.formFields.push(formField);
            formField.bindElement(prop);
        }
    }

    /**
     * Sets the on submit handler for the given form
     */
    setupFormSubmit(){
        this.formElement.onsubmit = event => {
            this.onSubmit();
            if(this.preventSubmit){
                event.preventDefault();
            }
            if(this.validateForm()){
                this.onValid();
                if(this.submitIfValid){
                    this.submitForm();
                }
            }
            else{
                this.onInvalid();
            }
        }
    }

    /**
     * Submits the form without calling prevent default
     */
    submitForm(){
        this.preventSubmit = false;
        this.formElement.submit();
        this.preventSubmit = true;
    }

    /**
     * Function that can be overriden to customize what happens on valid form submit
     */
    onValid(){
        this.debugLog('The form is valid.');
    }

    /**
     * Function that can be overriden to customize what happens on an invalid form submit
     */
    onInvalid(){
        this.debugLog('The form is not valid!');
    }

    /**
     * Function that can be overriden to customize what happens on a form submit regardles
     */
    onSubmit(){
        this.debugLog('Submitting the form');
    }

    /**
     * Get the errors of all the form fields
     */
    get errors(){
        const toReturn = [];
        this.formFields.forEach(formField => {
            toReturn.push.apply(toReturn, formField.errors);
        });
        this.debugLog(`${toReturn.length} errors found in the form.`);
        return toReturn;
    }

    /**
     * ### PRIVATE ###
     * Applies the neccessary action on the form field after validation, based on if it was valid
     * @param {FormField} formField the form field to apply the actions on 
     */
    afterFieldValidation(formField){
        if(formField.errors.length === 0)
            this.afterFieldValid(formField);
        else
            this.afterFieldInvalid(formField);

    }

    /**
     * ### PRIVATE ###
     * Applies the neccessary action on the valid form field.
     * @param {FormField} formField the form field to apply the actions on 
     */
    afterFieldValid(formField) {
        formField.bindedElement.classList.add(this.options.validClassName);
        formField.bindedElement.classList.remove(this.options.invalidClassName);
    }


    /**
     * ### PRIVATE ###
     * Applies the neccessary action on the invalid form field.
     * @param {FormField} formField the form field to apply the actions on 
     */
    afterFieldInvalid(formField) {
        formField.bindedElement.classList.add(this.options.invalidClassName);
        formField.bindedElement.classList.remove(this.options.validClassName);
    }

    debugLog(message){
        if(this.options.debug){
            console.log(`%cDebug: ${message} `, 'background-color: #333; color: #efefef; padding: 2px;');
        }
    }

    debugTable(toDebug){
        if(this.options.debug){
            console.table(toDebug);
        }
    }


}
