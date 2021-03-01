/**
 * Represents a field in an html form that can be validated.
 */
abstract class FormElement<Tvalue>{

    private _otherValues: Object;
    protected _bindedElement: HTMLInputElement;
    protected _isValid: boolean;
    protected _errors: string[]; // TODO: Add, add error method
    // Holds the values of other formfields, so they can be compared against each other
    protected _validators: (fieldValidator | fieldValidatorAsync)[]; 


    /**
     * @param args methods from the FormValidation.js,
     * to show what to validate in the form.
     */
    constructor(...args: fieldValidatorAll[]){
        this._isValid = true;
        this._errors = [];
        this._otherValues = {};
        this._validators = args;
    }


    /**
     *  Validates the field
     * - clears errors on every call
     * - runs all validators
     * - checks if valid
     * @returns {Boolean} true if valid false otherwise
     */
    validate(): Promise<boolean> | boolean {
        this._errors = [];
        this._validators.forEach((validator) => {
            console.log('######################################');
            console.log(this._validators);
            console.log(validator);
            validator(this);
        });
        this._isValid = this.errors.length === 0;
        return this.isValid;
    }

    /**
     * Adds two way binding with the value property of the element
     * Remarks:
     *  - camelCased id's will be converted to kebab-case,
     *  to allow camel case in form property for kebab cased element
    */ 
    bindElement(elementId: string): void{
        let element = document.querySelector(`#${elementId}`) as HTMLInputElement;
        if(element === null){
            // Search for kebab case if no element is found through the given id
            elementId = elementId.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
            element = document.querySelector(`#${elementId}`);
        }
        this.bindedElement = document.querySelector(`#${elementId}`);
    }

    //#region getters and setters...
    get isValid(): boolean {
        return this._isValid;
    }

    public get bindedElement(): HTMLInputElement {
        return this._bindedElement;
    }
    public set bindedElement(value: HTMLInputElement) {
        this._bindedElement = value;
    }

    public get errors(): string[] {
        return this._errors;
    }

    public get otherValues(): Object {
        return this._otherValues;
    }
    public set otherValues(value: Object) {
        this._otherValues = value;
    }
    //#endregion

    /** Gets the value of the binded element 
     *  Can be a different type for different form elements
     * */ 
    abstract get value(): Tvalue;

    /** Sets the value of the binded element
     *  Can be a different type for different form elements
    */
    abstract set value(val: Tvalue);

    /**
     * Clears the field
     * Has different implementation for clearing different fields
     */
    abstract clear(): void;
}