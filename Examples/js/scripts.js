const form = {
    id: "myForm",
    username: new FormField(isFilledIn(), wrapper(isPalindrome)),
    email: new FormField(minLength(3), isEmail()),
    files: new FileField(filesUploaded(1))
}

const formHelper = new FormHelper(form);

// formHelper.onValid = () => {
//     formHelper.submitForm();
// }

formHelper.onInvalid = () => {

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