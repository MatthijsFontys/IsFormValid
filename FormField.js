/**
 * Represents a field in an html form that can be validated.
 * Initiating the object this way improves readability in the Vue data object.
 */
class FormField{

    /**
     * @param args methods from the FormValidation.js,
     * to show what to validate in the form.
     */
    constructor(){
        this.isValid = true;
        this.errors = [];
        this.bindedElement = {};
        // Holds the values of other formfields, so they can be compared against each other
        this.otherValues = {};
        this.validators = Array.from(arguments);
    }



    /**
     *  Validates the field
     * - clears errors on every call
     * - runs all validators
     * - checks if valid
     * @returns {Boolean} true if valid false otherwise
     */
    validate(){
        this.errors = [];
        this.validators.forEach(validate => {
            validate(this);
        });
        this.isValid = this.errors.length === 0;
        return this.isValid;
    }

    /**
     * Adds two way binding with the value property of the element
    */ 
    bindElement(elementId){
        this.bindedElement = document.querySelector(`#${elementId}`);
    }

    /** Gets the value of the binded element */ 
    get value(){
        return this.bindedElement.value;
    }

    /** Sets the value of the binded element */
    set value(val){
        this.bindedElement.value = val;
    }

    /**
     * Clears the field
     */
    clear() {
        this.value = "";
    }
}