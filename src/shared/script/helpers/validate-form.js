import Vue from 'vue'
import i18n from '@/i18n.js'
import utils from '@/shared/script/helpers/utils.js'

export default (holder, options) => {
  
  const errors = {};
  const messages = [];
  const errorClass = options && options.errorClass ? options.errorClass : 'has-error';

  // ---------------------------------------------
  
  function addError (input, message) {
    if (!errors[input.name]) {
      errors[input.name] = {
        errors: [],
        el: input
      }

      input.classList.add(errorClass);

      ['focus', 'change'].forEach(e =>  input.addEventListener(e, clearError));
    }

    errors[input.name].errors.push(message);
  }

  function clearError (e) {
    const input = e.target;
    
    input.classList.remove(errorClass);

    ['focus', 'change'].forEach(e =>  input.removeEventListener(e, clearError));
  }

  // ---------------------------------------------
  
  holder.querySelectorAll('[required]:not([disabled])').forEach(input => {
    if (!input.value.trim())
      addError(input, i18n.t('errors.validateForm.emptyFields'));
  });
    
  holder.querySelectorAll('[type="email"], .is-email').forEach(input => {
    if (input.value && !utils.isEmail(input.value)) {
      addError(input, i18n.t('errors.validateForm.invalidEmail'));
    }
  });

  holder.querySelectorAll('[type="url"], .is-url').forEach(input => {
    if (input.value && !utils.isUrl(input.value)) {
      addError(input, i18n.t('errors.validateForm.invalidUrl'));
    }
  });
  
  holder.querySelectorAll('[minlength]').forEach(input => {
    const min = +input.getAttribute('minlength');
    
    if (input.value.length < min) {
      addError(input, i18n.t('errors.validateForm.minLengh'));
    }
  });
  
  holder.querySelectorAll('[type="radio"], [type="checkbox"]').forEach(input => {
    if (!holder.querySelector(':checked')) {
      addError(input, i18n.t('errors.validateForm.noEmptyChoices'));
    }
  });

  // ---------------------------------------------

  Object.keys(errors).forEach(key => {
    const error = errors[key].errors[0];

    if (messages.indexOf(error) <= -1) {
      messages.push(error);
    }
  });

  if (options && options.report) {
    messages.forEach(m => Vue.toasted.error(m));

    if (!options.noFollow) {
      const firstErrorEl = holder.querySelector(`.${errorClass}`);
      firstErrorEl && firstErrorEl.scrollIntoView();
    }
  }
  
  return { errors, messages, valid: messages.length <= 0 };
}