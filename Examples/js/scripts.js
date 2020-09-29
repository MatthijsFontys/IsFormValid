const form = {
    id: "myForm",
    username: new FormFieldAsync(isFilledIn(), wrapperAsync(wait)),
    email: new FormField(minLength(3)),
    files: new FileField(filesUploaded(0))
}

const formHelper = new FormHelperAsync(form, false);

formHelper.onValid = () => {
    alert("Awesome! Your form is valid!");
}

formHelper.onInvalid = () => {
    alert(";__( Your form is invalid!");
}

function wait(){
    return new Promise(resolve => setTimeout(resolve, 2_000))
    .then(() => true);
}

function isPalindrome(input){
    let output = "";
    for(let i=0; i<input.length; i++){
        output = input[i] + output;
    }
    return output.toLowerCase() === input.toLowerCase();
}
// formHelper.onValid = () => console.log('The form is valid YAY!');
// formHelper.onInvalid = () => console.log('Form is not valid!');