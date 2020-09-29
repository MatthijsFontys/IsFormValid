class FileField extends FormField {
    /** Gets the value of the binded element */ 
    get value(){
        return this.bindedElement.files;
    }

    /** Sets the value of the binded element */
    set value(val){
        console.log("The value of a FileField can't be set");
    }
}