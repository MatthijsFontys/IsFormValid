const form = {
    id: "myForm",
    //userName: new FormFieldAsync(isFilledIn(), wrapperAsync(wait)),
    userName: new FormFieldAsync(isFilledIn()),
    email: new FormField(minLength(3), wrapper(isPalindrome)),
    files: new FileField(filesUploaded(0))
}

const formHelper = new FormHelper(form, {debug: true});

formHelper.onValid = () => {
    alert("Awesome! Your form is valid!");
}

formHelper.onInvalid = () => {
    alert("Your form is invalid!");
    console.log(formHelper.errors);
}

function wait(){
    return new Promise(resolve => setTimeout(resolve, 1_000))
    .then(() => true);
}

function isPalindrome(input){
    let output = "";
    console.log(input);
    for(let i=0; i < input.length; i++){
        output = input[i] + output;
    }
    return output.toLowerCase() === input.toLowerCase();
}

// formHelper.onValid = () => console.log('The form is valid YAY!');
// formHelper.onInvalid = () => console.log('Form is not valid!');