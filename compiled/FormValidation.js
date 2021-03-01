function isFilledIn(customError) {
    return (input) => {
        const value = input.value;
        if (value == null || value == "") {
            addToErrors(input, "This field is required", customError);
        }
    };
}
function isEmail(customError) {
    return (input) => {
        const value = input.value;
        const regex = /\S+@\S+\.\S+/;
        if (!regex.test(value)) {
            addToErrors(input, 'This needs to be a valid email', customError);
        }
    };
}
function isSameAs(sameAs, customError) {
    return (input) => {
        const value = input.value;
        const valueOfOther = input.otherValues[sameAs];
        if (value !== valueOfOther) {
            addToErrors(input, `${value} is not the same is ${sameAs}`, customError);
        }
    };
}
function minLength(minLength, customError) {
    return (input) => {
        const value = input.value;
        if (value.length < minLength) {
            addToErrors(input, `Requires a minimum length of ${length}`, customError);
        }
    };
}
function maxLength(maxLength, customError) {
    return (input) => {
        const value = input.value;
        if (value.length > maxLength) {
            addToErrors(input, `Exceeds the maximum length of ${length}`, customError);
        }
    };
}
function filesUploaded(amount, customError) {
    return (input) => {
        if (input.value.length !== amount) {
            addToErrors(input, `There amount of files uploaded is not ${amount}`, customError);
        }
    };
}
function wrapper(wrappedFunction, customError) {
    return (input) => {
        if (!wrappedFunction(input.value)) {
            addToErrors(input, 'Wrapped function returned not valid', customError);
        }
    };
}
function wrapperAsync(wrappedFunction, customError) {
    return (input) => {
        return wrappedFunction(input.value)
            .then(result => {
            if (!result) {
                addToErrors(input, 'Wrapped async function returned not valid', customError);
            }
        })
            .catch(reason => {
            addToErrors(input, `Wrapped async function threw error: ${reason}`);
        });
    };
}
function addToErrors(input, errorMsg, customError) {
    const error = customError || errorMsg;
    input.errors.push(error);
}
//# sourceMappingURL=FormValidation.js.map