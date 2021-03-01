/**
 * Represents a field in an html form that can be validated.
 */
class FormField extends FormElement<string> {

    constructor(){
        super(); // For readability
    }

    /**
     * @override from FormElement
     */
    get value(): string{
        return this.bindedElement.value;
    }

    /**
     * @override from FormElement
     */
    set value(val: string){
        this.bindedElement.value = val;
    }


    /**
     * @override from FormElement
     */
    clear() {
        this.value = '';
    }
}