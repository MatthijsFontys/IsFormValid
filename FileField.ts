class FileField extends FormElement<FileList> {
    
    constructor(){
        super(); // For readability
    }
    
    /**
     * @override from FormElement
     */ 
    get value(): FileList {
        return this.bindedElement.files;
    }

    /**
     * @override from FormElement
     */
    set value(val: FileList){
        this.bindedElement.files = val;
    }

    /**
     * @override from FormElement
     */
    clear(){
        this.bindedElement.value = null;
    }
}