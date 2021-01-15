class FileField extends FormField {
    /** Gets the value of the binded element */ 
    get value(){
        return this.bindedElement.files;
    }

    /** Sets the value of the binded element */
    set value(val){
        this.bindedElement.files = val;
    }

    clear(){
        this.bindedElement.value = null;
    }
}