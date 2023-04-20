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
    if (rule.validate && typeof rule.validate === 'function') {
      const customErrorMessage = rule.validate(input.value.trim());
      if (customErrorMessage) {
        errorMessage = customErrorMessage;
        isValid = false;
      }
    }
  });
  
  return { isValid, errorMessage };
}

function addLiveValidation(input, validationRules, successMessage, showLiveFeedback) {
  const errorElement = document.createElement('div');
  errorElement.classList.add('error-message');
  input.parentElement.appendChild(errorElement);
  
  input.addEventListener('input', async () => {
    const { isValid, errorMessage } = validateInput(input, validationRules);
    
    if (isValid) {
      errorElement.innerHTML = '';
      input.classList.remove('invalid');
      if (successMessage) {
        const successElement = document.createElement('div');
        successElement.classList.add('success-message');
        successElement.innerHTML = successMessage;
        input.parentElement.appendChild(successElement);
        setTimeout(() => {
          successElement.remove();
        }, 2000);
      }
    } else {
      errorElement.innerHTML = errorMessage;
      input.classList.add('invalid');
    }
  input.addEventListener('blur', async () => {
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

function addGroupValidation(inputs, validationFunction, errorMessage) {
  inputs.forEach(input => {
    input.addEventListener('input', async () => {
      const values = inputs.map(i => i.value.trim());
      const isValid = validationFunction(...values);
      inputs.forEach(i => {
        if (isValid) {
          i.classList.remove('invalid');
        } else {
          i.classList.add('invalid');
        }
      });
      const errorElement = inputs[0].parentElement.querySelector('.error-message');
      if (isValid) {
        errorElement.innerHTML = '';
      } else {
        errorElement.innerHTML = errorMessage;
      }
    });
  });
}

function validateAsync(input, validationFunction) {
  return new Promise((resolve, reject) => {
    validationFunction(input.value.trim(), (errorMessage) => {
      if (errorMessage) {
        reject(errorMessage);
      } else {
        resolve();
      }
    });
  });
}
