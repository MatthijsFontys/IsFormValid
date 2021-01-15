/**
 * Represents a field in an html form that can be validated.
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
     * Remarks:
     *  - camelCased id's will be converted to kebab-case,
     *  to allow camel case in form property for kebab cased element
    */ 
    bindElement(elementId){
        let element =  document.querySelector(`#${elementId}`);
        if(element === null){
            // Search for kebab case if no element is found through the given id
            elementId = elementId.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
            element = document.querySelector(`#${elementId}`);
        }
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