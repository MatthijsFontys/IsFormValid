const form = {
    id: "myForm",
    userName: new FormField(isFilledIn()),
    email: new FormFieldAsync(minLength(3), wrapper(isPalindrome), wrapperAsync(wait)),
    files: new FileField(filesUploaded(0))
}

const formHelper = new FormHelperAsync(form, {debug: false});

formHelper.onValid = () => {
    alert("Awesome! Your form is valid!");
}

formHelper.onInvalid = () => {
    alert("Your form is invalid!");
}

function wait(){
    return new Promise(resolve => setTimeout(resolve, 1_000))
    .then(() => true);
}

function isPalindrome(input){
    let output = "";
    for(let i=0; i < input.length; i++){
        output = input[i] + output;
    }
    return output.toLowerCase() === input.toLowerCase();
}

// formHelper.onValid = () => console.log('The form is valid YAY!');
// formHelper.onInvalid = () => console.log('Form is not valid!');