# IsFormValid
Vanilla javascript library for validating HTML forms before performing a HTTP action.

## Functionality
- Adds a submit event handler with prevent default functionality
- Standard methods for form validation
- Data binding between the javascript and html form
- Support for text and file fields
- OnValid and OnInvalid callback functions
- Supports async method calls to the backend.


## Roadmap
- Default options for showing css
- Easy bundled access
- More documentation, testing and examples
- Keep an up to date version working for Vue
- Add support for on input for real time validation
- Add support for limiting requests to the backend
- Easy way of showing errors in the DOM
- Allow access to the on progress event for loadingbar support


## Examples

```javascript
const form = {
    id: "signUp",
    username: new FormField(isFilledIn(), maxLength(12)),
    email: new FormField(isEmail()),
    password: new FormField(minLength(8)),
    confirmPass: new FormField(isSameAs('password'))
}

const formHelper = new FormHelper(form);

formHelper.onValid() = () => {
    alert('This is a valid form');
    formHelper.clearForm();
}
```

