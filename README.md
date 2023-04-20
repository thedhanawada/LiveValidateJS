## LiveValidateJS

LiveValidateJS is a lightweight JavaScript library that provides real-time form validation and input checking for HTML forms. With LiveValidateJS, you can create custom validation rules for each input field in your form and receive instant feedback on the input's validity as the user types. LiveValidateJS also supports server-side validation for added security and can help reduce form submission errors and increase user satisfaction.

## Features

- Customizable validation rules for each input field
- Real-time validation and input checking
- Automatic error message generation and display
- Server-side validation support
- Lightweight and easy to use

## Installation
You can include the instantvalidate.js file in your HTML file using a script tag:

```html
Copy code
<script src="path/to/livevalidate.js"></script>
```

## CDN

You can also use LiveValidateJS via jsDelivr, a free, fast, and reliable open-source CDN. To include the library from jsDelivr, use the following URL:

```HTML
<script src="https://cdn.jsdelivr.net/gh/Formu8JS/LiveValidateJS@main/livevalidate.js"></script>
```

By using jsDelivr, you can take advantage of their global network to improve the performance and reliability of your website. jsDelivr also supports HTTPS, which means you can securely deliver your content to users.

## Usage
To use LiveValidateJS, you need to add the livevalidate class to each input field you want to validate, and define the validation rules for each field using data attributes. Here's an example:

```html
<form>
  <label for="email">Email:</label>
  <input type="email" id="email" name="email" class="livevalidate"
         data-validation-rules='{"required":true, "email":true}'>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" class="livevalidate"
         data-validation-rules='{"required":true, "minLength":8}'>

  <button type="submit">Submit</button>
</form>
```

In this example, we have two input fields - an email field and a password field - that are both marked with the livevalidate class. We've also defined the validation rules for each field using data attributes (data-validation-rules). The email field is required and must be a valid email format, while the password field is also required and must be at least 8 characters long.

To initialize LiveValidateJS, simply call the livevalidate() function on the form element:

```javascript
const form = document.querySelector('form');
livevalidate(form);
```

This will add event listeners to the input fields to perform real-time validation and display error messages if the input is invalid. If the user tries to submit the form with invalid inputs, LiveValidateJS will prevent the form submission and display error messages for all invalid fields.

## Validation Rules

LiveValidateJS supports a variety of validation rules, which can be defined using data attributes on the input fields. Here are the currently supported validation rules:

- **required**: Requires the input field to have a non-empty value.
- **requiredMessage**: The error message to display if the input field is required but empty.
- **minLength**: Requires the input field to have a minimum length.
- **minLengthMessage**: The error message to display if the input field is too short.
- **maxLength**: Requires the input field to have a maximum length.
- **maxLengthMessage**: The error message to display if the input field is too long.
- **pattern**: Requires the input field to match a regular expression pattern.
- **patternMessage**: The error message to display if the input field doesn't match the pattern.
- **email**: Requires the input field to be a valid email format.
- **emailMessage**: The error message to display if the input field is not a valid email format.

To define multiple validation rules for an input field, simply separate them with commas:

```html
<input type="text" name="username" class="livevalidate"
       data-validation-rules='{"required":true, "minLength":3, "maxLength":20}' />
```

## Server-Side Validation

While LiveValidateJS provides real-time validation for form inputs, it's important to note that client-side validation should always be supplemented with server-side validation for security and reliability. LiveValidateJS makes it easy to integrate server-side validation into your form processing flow.

When the form is submitted, LiveValidateJS prevents the default form submission behavior and sends an AJAX request to the server to validate the inputs. The server should return a JSON response indicating whether the inputs are valid or not. If the inputs are valid, the server can process the form data and send a success response. If the inputs are invalid, the server should send an error response containing the error messages to display to the user.

Here's an example of server-side validation using Express.js and the livevalidatejs package:

```javascript
const express = require('express');
const livevalidatejs = require('livevalidatejs');
const bodyParser = require('body-parser');

const app = express();

// Parse form data
app.use(bodyParser.urlencoded({ extended: false }));

// Validate form inputs
app.post('/process-form', (req, res) => {
  const validationResult = livevalidatejs.validate(req.body);
  
  if (validationResult.isValid) {
    // Form data is valid, process it and send a success response
    res.send({ success: true });
  } else {
    // Form data is invalid, send an error response with the validation errors
    res.status(400).send({ errors: validationResult.errors });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
```

In this example, we're using the livevalidatejs package to perform server-side validation of the form inputs. We're also using the body-parser package to parse the form data in the request body.

When the form is submitted, the server-side validation route (/process-form) receives the form data in the request body. We pass the form data to the livevalidatejs.validate() function to perform the same validation rules that were defined on the client side. If the form data is valid, we process the form data and send a success response. If the form data is invalid, we send a 400 Bad Request response with the validation errors in the response body.

## Contributing
If you find a bug or have a suggestion for improvement, feel free to open an issue or submit a pull request. Contributions are always welcome!
