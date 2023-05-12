[![npm version](https://img.shields.io/npm/v/livevalidatejs)](https://img.shields.io/npm/v/livevalidatejs)
[![npm](https://img.shields.io/npm/l/livevalidatejs?style=flat-square)](https://img.shields.io/npm/l/livevalidatejs?style=flat-square)
[![last-commit](https://img.shields.io/github/last-commit/Formu8JS/LiveValidateJS)](https://img.shields.io/github/last-commit/Formu8JS/LiveValidateJS)


# Live Validation Library

This live validation library helps you add real-time input validation to your forms with a simple and easy-to-use API. The library includes a set of common validation rules and allows you to create custom validation functions.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [addLiveValidation](#addlivevalidation)
  - [addGroupValidation](#addgroupvalidation)
  - [validateAsync](#validateasync)
- [Example](#example)
- [Customization](#customization)
- [Contributing](#contributing)

## Features

- Real-time input validation
- Built-in common validation rules:
  - Required
  - Min length
  - Max length
  - Pattern
- Custom validation functions
- Async validation support
- Group validation
- Debounce to optimize performance
- Error message customization
- Success messages

## Installation

You can use LiveValidateJS in your project by including the script file in your HTML code or by installing it via NPM.

## Via CDN
To include the latest version of LiveValidateJS from the CDN, add the following script tag to your HTML file:

```html
<script src="https://cdn.jsdelivr.net/gh/Formu8JS/LiveValidateJS@main/livevalidate.js"></script>
```

This will make the LiveValidate object available in your global namespace, and you can use it to create new instances of the LiveValidate class and perform form validation.

## Via NPM
To install LiveValidateJS using NPM, open your terminal or command prompt and navigate to your project directory. Then, run the following command:

```html
npm install livevalidatejs
```

This will download and install the latest version of LiveValidateJS from the NPM registry, along with any dependencies that it requires.

## Usage

### Import the library

Once LiveValidateJS is installed, you can import it into your project using the following syntax:

```javascript
import LiveValidate from 'livevalidatejs';
```

### addLiveValidation

Call `addLiveValidation()` to apply validation rules to an input element. This function takes the following parameters:

1. input: The input element to validate.
2. validationRules: An array of validation rules.
3. successMessage (optional): A message to display when the input is valid.
4. showLiveFeedback (optional): Whether to show live feedback for validation.

### addGroupValidation

Call `addGroupValidation()` to apply validation rules to a group of inputs. This function takes the following parameters:

1. inputs: An array of input elements to validate.
2. validationFunction: A custom validation function that returns a boolean. It should return true if the group of inputs is valid and false otherwise.
3. errorMessage: The error message to display when the group is invalid.

### validateAsync

Call `validateAsync()` to perform asynchronous validation. This function takes the following parameters:

1. input: The input element to validate.
2. validationFunction: A custom validation function that receives the input value and a callback. The callback should be called with an error message when the input is invalid or with no arguments when the input is valid.

## Example

```html
<!-- HTML -->
<form id="example-form">
  <div class="input-wrapper">
    <label for="name">Name:</label>
    <input type="text" id="name" />
  </div>
  <div class="input-wrapper">
    <label for="email">Email:</label>
    <input type="email" id="email" />
  </div>
  <div class="input-wrapper">
    <label for="password">Password:</label>
    <input type="password" id="password" />
  </div>
  <div class="input-wrapper">
    <label for="confirm-password">Confirm Password:</label>
    <input type="password" id="confirm-password" />
  </div>
  <button type="submit">Submit</button>
</form>

<!-- JavaScript -->
<script>
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirm-password');

  // validation for name input
  addLiveValidation(nameInput, [
    { required: true, requiredMessage: 'Please enter your name' },
  ]);

  // validation for email input
  addLiveValidation(emailInput, [
    { required: true, requiredMessage: 'Please enter your email' },
    { pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, patternMessage: 'Please enter a valid email' },
  ]);

  // validation for password input
  addLiveValidation(passwordInput, [
    { required: true, requiredMessage: 'Please enter a password' },
    { minLength: 8, minLengthMessage: 'Password must be at least 8 characters long' },
  ]);

  // validation for confirm password input
  addLiveValidation(confirmPasswordInput, [
    { required: true, requiredMessage: 'Please confirm your password' },
  ]);

  // group validation for password and confirm password
  addGroupValidation([passwordInput, confirmPasswordInput], (password, confirmPassword) => {
    return password === confirmPassword;
  }, 'Passwords do not match');
</script>
```
## Customization

You can easily customize the look and feel of the library by modifying the CSS styles of the elements it generates. The library adds various CSS classes to the error and success messages, which you can target in your CSS to apply your custom styles.

Below are the CSS classes used by the library and a brief explanation of their purpose:

- error-message: This class is added to the container that holds individual error messages for each input field.
- error-item: This class is added to each individual error message within the error container.
- group-error-message: This class is added to the container that holds the group validation error message.
- success-message: This class is added to the success message container that appears when the input passes validation.

Here's an example of customizing the styles using CSS:

```javascript
/* Customize error message container */
.error-message,
.group-error-message {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
  color: #721c24;
  font-size: 14px;
  margin-top: 5px;
  padding: 10px;
}

/* Customize individual error message items */
.error-item {
  margin-bottom: 5px;
}

/* Remove margin from the last error message item */
.error-item:last-child {
  margin-bottom: 0;
}

/* Customize success message container */
.success-message {
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  color: #155724;
  font-size: 14px;
  margin-top: 5px;
  padding: 10px;
}

/* Customize the invalid input field */
input.invalid {
  border: 1px solid #dc3545;
}
```

## Enhancements for LiveValidateJS

Here are some suggestions to improve JavaScript validation library. PRs are welcome.

1. Store `input.value.trim()` in a variable to avoid repetition. This makes the code cleaner and more efficient.
2. **Unified Error Display**: Use your handleErrorMessage function in addGroupValidation and validateAsync for consistent error handling
   ```javascript
   if (!isValid) {
  handleErrorMessage(groupErrorElement, errorMessage);
}
```
3. **Async Validations**: Consider adapting your validateInput and addGroupValidation functions to handle asynchronous validation rules. This can make your library more flexible and able to handle a wider range of use cases.
4. **Type Checking**: Add checks to ensure the inputs to your functions are of the expected type.
   ```javascript
if (!Array.isArray(inputs) || typeof validationFunction !== 'function') {
  throw new Error('Invalid arguments');
}
```
5. **Encapsulation**: Group related functions into a class or module to prevent global scope pollution.
6. **Custom Styles**: Allow users to define their own error class.


## License

LiveValidateJS is released under the [MIT license](https://github.com/thedhanawada/LiveValidateJS/blob/main/LICENSE). This is a permissive open-source software license that allows for free use, modification, and distribution of the software without requiring payment or attribution.

The [MIT license](https://opensource.org/licenses/MIT) is a widely-used open-source software license that permits free use, modification, and distribution of the software without requiring payment or attribution. This means that anyone can use, modify, and distribute the software without having to pay or give credit to the original author.

Using an open-source license like the MIT license is important because it ensures that the software can be used and improved upon by as many people as possible. By releasing LiveValidateJS under the MIT license, we hope to encourage others to use and contribute to the project, and to promote the wider adoption of open-source software in general.

We take the licensing of LiveValidateJS seriously, and believe that it is a key part of the project's success. We encourage you to read the [license](https://github.com/thedhanawada/LiveValidateJS/blob/main/LICENSE) in full before using or contributing to the project, and to abide by its terms in your use and distribution of the software.
