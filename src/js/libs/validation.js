import validation from 'jquery-validation';
console.log($);
$.validator.setDefaults({
  errorClass: 'form-error-message jq-validate-error',
  errorElement: 'p',
  onkeyup: false,
  ignore: '',
  ajax: false,
  currentDom: null,
  highlight: function(element, errorClass, validClass) {
  },
  unhighlight: function(element, errorClass, validClass) {
  },
  errorPlacement: function(error, element) {
  },
  invalidHandler: function(data, validate) {
    console.log(data);
    console.log(validate);
  },
  submitError: function(data) {
    console.log('submitError');
  },
  submitSuccess: function(data) {
    console.log('submitSuccess');
  },
  submitHandler: function(form) {
      console.log('submitSuccess');
  }
});