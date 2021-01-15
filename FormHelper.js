/**
 * Class for validating and helping function for a form
 */
class FormHelper{

    /**
     * @param {Object} form - the form to handle
     * @param {Boolean} submitIfValid - should the helper submit when valid in onsubmit
     */
    constructor(form, submitIfValid = true){
        // Settings
        this.submitIfValid = submitIfValid;

        // Toggle for submitting the form without preventing default behaviour
        this.preventSubmit = true;

        // Setup
        this.formFields = []; // All form fields to loop through
        this.setupForm(form);
        this.setupFormFieldDatabBinding();
        this.setupFormSubmit();
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
        console.log('The form is valid.');
    }

    /**
     * Function that can be overriden to customize what happens on an invalid form submit
     */
    onInvalid(){
        console.log('The form is not valid!');
    }

    /**
     * Function that can be overriden to customize what happens on a form submit regardles
     */
    onSubmit(){
        console.log('Submitting the form');
    }

    /**
     * Get the errors of all the form fields
     */
    get errors(){
        const toReturn = [];
        this.formFields.forEach(formField => {
            toReturn.push.apply(toReturn, formField.errors);
        });
        return toReturn;
    }



}
