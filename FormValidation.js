/*
    File that holds all the methods for validating a form.
    Methods that are needed for the form should be imported
*/


/**
 * Adds an error if the value is empty
 * @param {String} customError custom error message, overrides default message
 */
function isFilledIn(customError){
    return (input) => {
        const value = input.value;
        if(value == null || value == ""){
            addToErrors(input, "This field is required", customError);
        }
    }
}

/**
 * Adds an error if the values is not an email
 * @param {String} customError custom error message, overrides default message
 * @returns {Function} returns a isEmail validation function
 */
function isEmail(customError){
    return (input) => {
        const value = input.value;
        const regex = /\S+@\S+\.\S+/;

        if(! regex.test(value)){
            addToErrors(input, 'This needs to be a valid email', customError);
        }
    }
}

/**
 * Adds an error if the values are not the same
 * @param {String} sameAs value that the input will be compared to
 * @param {String} customError custom error message, overrides default 
 * @returns {Function} returns a isSameAs validation function
 */
function isSameAs(sameAs, customError){
    return (input) => {
        const value = input.value;
        const valueOfOther = input.otherValues[sameAs];
        if(value !== valueOfOther){
            addToErrors(input, `${value} is not the same is ${sameAs}`, customError)
        }
    }
}

/**
 * Adds an error if the value does not atleast have the minimum length
 * @param {int} minLength the mininum length the input has to be 
 * @param {String} customError custom error message, overrides default message
 * @returns {Function} returns a minLength validation function
 */
function minLength(minLength, customError){
    return (input) => {
        const value = input.value;
        if(value.length < minLength){
            addToErrors(input, `Requires a minimum length of ${length}`, customError);
        }
    }
}

/**
 * Adds an error if the values is longer than the maximum length
 * @param {int} maxLength the maximum length that the input should not exceed
 * @param {String} customError custom error message, overrides default message
 * @returns {Function} returns a maxLength validation function
 */
function maxLength(maxLength, customError){
    return (input) => {
        const value = input.value;
        if(value.length > maxLength){
            addToErrors(input, `Exceeds the maximum length of ${length}`, customError);
        }
    }
}

/**
 * Adds an error if the wrong amount of files is uploaded
 * @param {int} maxLength the maximum length that the input should not exceed
 * @param {String} customError custom error message, overrides default message
 * @returns {Function} returns a maxLength validation function
 */
function filesUploaded(amount, customError){
    return (input) => {
        if(input.value.length !== amount){
            addToErrors(input, `There amount of files uploaded is not ${amount}`, customError);
        }
    }
}

/**
 * If special validation is needed it can be wrapped with this function
 * @param {Function} wrappedFunction the custom function to be wrapped
 * @param {String} customError custom error message, overrides default message. 
 * @returns {Function} returns the custom function wrapped with default functionality 
 */
function wrapper(wrappedFunction, customError){
    return (input) => {
        if(! wrappedFunction(input.value)){
            addToErrors(input, 'Wrapped function returned not valid', customError);
        }
    }
}


/**
 * If async is needed it can be wrapped with this function
 * When this is used, use FormFieldAsync and FormHelperAsync instead.
 * @param {Function} wrappedFunction the custom function to be wrapped
 * @param {String} customError custom error message, overrides default message. 
 * @returns {Function} returns the custom function wrapped with default functionality 
 */
function wrapperAsync(wrappedFunction, customError){
    return (input) => {
        return wrappedFunction(input.value)
        .then(result => {
            if(! result){
                alert("It's the wrapper again!");
                addToErrors(input, 'Wrapped async function returned not valid', customError);
            }
        })
        .catch(reason => {
            addToErrors(input, `Wrapped async function threw error: ${reason}`);
        });
    }
}

/**
 * #### PRIVATE ####
 * Adds the error message to the formField
 * @param {Object} input the form field will get the error
 * @param {String} errorMsg the default error message
 * @param {String} customError the custom error message
 */
function addToErrors(input, errorMsg, customError){
        const error = customError || errorMsg;
        input.errors.push(error);
}