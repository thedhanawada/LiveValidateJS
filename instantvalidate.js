function validateInput(input, validationRules) {
  let errorMessage = '';
  let isValid = true;
  
  validationRules.forEach(rule => {
    if (rule.required && input.value.trim() === '') {
      errorMessage = rule.requiredMessage || 'This field is required';
      isValid = false;
    }
    if (rule.minLength && input.value.trim().length < rule.minLength) {
      errorMessage = rule.minLengthMessage || `Must be at least ${rule.minLength} characters long`;
      isValid = false;
    }
    if (rule.maxLength && input.value.trim().length > rule.maxLength) {
      errorMessage = rule.maxLengthMessage || `Must be no more than ${rule.maxLength} characters long`;
      isValid = false;
    }
    if (rule.pattern && !rule.pattern.test(input.value.trim())) {
      errorMessage = rule.patternMessage || 'Invalid input';
      isValid = false;
    }
  });
  
  return { isValid, errorMessage };
}

function addLiveValidation(input, validationRules) {
  const errorElement = document.createElement('div');
  errorElement.classList.add('error-message');
  input.parentElement.appendChild(errorElement);
  
  input.addEventListener('input', () => {
    const { isValid, errorMessage } = validateInput(input, validationRules);
    
    if (isValid) {
      errorElement.innerHTML = '';
      input.classList.remove('invalid');
    } else {
      errorElement.innerHTML = errorMessage;
      input.classList.add('invalid');
    }
  });
  
  input.addEventListener('blur', () => {
    const { isValid, errorMessage } = validateInput(input, validationRules);
    
    if (!isValid) {
      errorElement.innerHTML = errorMessage;
      input.classList.add('invalid');
    }
  });
  
  input.addEventListener('focus', () => {
    errorElement.innerHTML = '';
    input.classList.remove('invalid');
  });
}

// Example usage:
const emailInput = document.getElementById('email');
const emailValidationRules = [
  { required: true },
  { pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ }
];
addLiveValidation(emailInput, emailValidationRules);
