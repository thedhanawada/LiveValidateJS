function validateInput(input, rule) {
  let errorMessage = '';
  let isValid = true;

  if (rule.required && input.value.trim() === '') {
    errorMessage = rule.requiredMessage || 'This field is required';
    isValid = false;
  } else if (rule.minLength && input.value.trim().length < rule.minLength) {
    errorMessage = rule.minLengthMessage || `Must be at least ${rule.minLength} characters long`;
    isValid = false;
  } else if (rule.maxLength && input.value.trim().length > rule.maxLength) {
    errorMessage = rule.maxLengthMessage || `Must be no more than ${rule.maxLength} characters long`;
    isValid = false;
  } else if (rule.pattern && !rule.pattern.test(input.value.trim())) {
    errorMessage = rule.patternMessage || 'Invalid input';
    isValid = false;
  } else if (rule.validate && typeof rule.validate === 'function') {
    const customErrorMessage = rule.validate(input.value.trim());
    if (customErrorMessage) {
      errorMessage = customErrorMessage;
      isValid = false;
    }
  }

  return { isValid, errorMessage };
}


function debounce(func, wait) {
  let timeout;
  return function (...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
}

function handleErrorMessage(errorElement, errorMessage) {
  if (!errorElement.querySelector(`[data-error="${errorMessage}"]`)) {
    const errorItem = document.createElement('div');
    errorItem.classList.add('error-item');
    errorItem.setAttribute('data-error', errorMessage);
    errorItem.innerHTML = errorMessage;
    errorElement.appendChild(errorItem);
  }
}

function removeErrorMessage(errorElement, errorMessage) {
  const errorItem = errorElement.querySelector(`[data-error="${errorMessage}"]`);
  if (errorItem) {
    errorElement.removeChild(errorItem);
  }
}

function handleValidation(input, isValid, errorMessage, errorElement) {
  if (isValid) {
    input.classList.remove('invalid');
    removeErrorMessage(errorElement, errorMessage);
  } else {
    input.classList.add('invalid');
    handleErrorMessage(errorElement, errorMessage);
  }
}

function addLiveValidation(input, validationRules, successMessage, showLiveFeedback) {
  const errorElement = document.createElement('div');
  errorElement.classList.add('error-message');
  input.parentElement.appendChild(errorElement);

  const debouncedInputHandler = debounce(() => {
    validationRules.forEach((rule) => {
      const { isValid, errorMessage } = validateInput(input, rule);
      handleValidation(input, isValid, errorMessage, errorElement);
    });

    if (!input.classList.contains('invalid') && successMessage) {
      const successElement = document.createElement('div');
      successElement.classList.add('success-message');
      successElement.innerHTML = successMessage;
      input.parentElement.appendChild(successElement);
      setTimeout(() => {
        successElement.remove();
      }, 2000);
    }
  }, 300);

  input.addEventListener('input', debouncedInputHandler);

  input.addEventListener('blur', () => {
    validationRules.forEach((rule) => {
      const { isValid, errorMessage } = validateInput(input, rule);
      handleValidation(input, isValid, errorMessage, errorElement);
    });
  });

  input.addEventListener('focus', () => {
    errorElement.innerHTML = '';
    input.classList.remove('invalid');
  });
}

function addGroupValidation(inputs, validationFunction, errorMessage) {
  const groupErrorElement = document.createElement('div');
  groupErrorElement.classList.add('group-error-message');
  inputs[0].parentElement.parentElement.insertBefore(groupErrorElement, inputs[0].parentElement);

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

      if (isValid) {
        groupErrorElement.innerHTML = '';
      } else {
        groupErrorElement.innerHTML = errorMessage;
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
