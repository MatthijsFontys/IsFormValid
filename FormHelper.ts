type formObj = {id: string};

/**
 * Class for validating and helping function for a form
 */
class FormHelper{
    // Toggle for preventing submit. not a setting
    protected _preventSubmit: boolean;
    protected _formFields: FormElement<any>[];
    protected _formElement: HTMLFormElement;
    protected _form: any;
    protected _options: FormHelperOptions;

    private _formLogger: IFormLogger;

    /**
     * @param {Object} form - the form to handle
     * @param {Boolean} submitIfValid - should the helper submit when valid in onsubmit
     */
    constructor(form: any, customOptions = {}){        
        // Toggle for submitting the form without preventing default behaviour
        this._preventSubmit = true;
        // Setup
        this._form = form;
        this._formFields = []; // All form fields to loop through
        this.setupOptions(customOptions);
        this._formLogger = FormLogger.initInstance(this._options.debug);
        this.setupForm(form);
        this.setupFormFieldDatabBinding();
        this.setupFormSubmit();

        this.debugLog("To disable debugging\npass the option debug: false, to the formHelper.");

    }

    /**
     * Validates the form and shares necessary form values
     * @returns {Boolean} true if there are no errors in the entire form - false otherwise
     */
    private validateForm(): boolean{
        const values: any = {};
        let isFormValid = true;
        for(const prop in this._form){
            const formField = this._form[prop];
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
        this._formFields.forEach(formField => {
          formField.clear();  
        });
    }


    /**
     * Get the errors of all the form fields
     */
    get errors(){
        const toReturn: string[] = [];
        this._formFields.forEach(formField => {
            toReturn.push.apply(toReturn, formField.errors);
        });
        this.debugLog(`${toReturn.length} errors found in the form.`);
        return toReturn;
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
     * Submits the form without calling prevent default
     */
    protected submitForm(){
        this._preventSubmit = false;
        this._formElement.submit();
        this._preventSubmit = true;
    }


    /**
     * Sets up the form and gets the form element from the DOM
     * @param {Object} form - the form object with formfields 
     */
    protected setupForm(form: any){
        let elementId: string = `#${form.id}`;
        this._formElement = document.querySelector(elementId);
        if(this._formElement === null){
            // Search for kebab case if no element is found through the given id
            elementId = elementId.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
            this._formElement = document.querySelector(elementId);
        }
        delete form.id;
    }

    /**
     * Sets the element to databind for all the form fields
     */
    protected setupFormFieldDatabBinding(){
        for(const prop in this._form){
            const formField = this._form[prop]; 
            this._formFields.push(formField);
            formField.bindElement(prop);
        }
    }

    protected setupOptions(options: any){
        // Options
        this._options = new FormHelperOptions();
        this._options = {...this._options, ...options};
    }

    /**
     * Sets the on submit handler for the given form
     */
    protected setupFormSubmit(){
        this._formElement.onsubmit = event => {
            this.onSubmit();
            if(this._preventSubmit){
                event.preventDefault();
            }
            if(this.validateForm()){
                this.onValid();
                if(this._options.submitIfValid){
                    this.submitForm();
                }
            }
            else{
                this.onInvalid();
            }
        }
    }



    /**
     * Applies the neccessary action on the form field after validation, based on if it was valid
     * @param {FormField} formField the form field to apply the actions on 
     */
    protected afterFieldValidation(formField: FormElement<any>){
        if(formField.errors.length === 0)
            this.afterFieldValid(formField);
        else
            this.afterFieldInvalid(formField);

    }

    /**
     * Applies the neccessary action on the valid form field.
     * @param {FormField} formField the form field to apply the actions on 
     */
    protected afterFieldValid(formField: FormElement<any>) {
        formField.bindedElement.classList.add(this._options.validClassName);
        formField.bindedElement.classList.remove(this._options.invalidClassName);
    }


    /**
     * Applies the neccessary action on the invalid form field.
     * @param {FormField} formField the form field to apply the actions on 
     */
    protected afterFieldInvalid(formField: FormElement<any>) {
        formField.bindedElement.classList.add(this._options.invalidClassName);
        formField.bindedElement.classList.remove(this._options.validClassName);
    }

    protected debugLog(message: any){
        this._formLogger.debugLog(message);
    }

    protected debugTable(message: any){
        this._formLogger.debugTable(message);
    }


}
