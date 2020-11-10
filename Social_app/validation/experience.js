const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateExperienceInput(data) {
  let errors = {};

  data.position = !isEmpty(data.position) ? data.position : "";
  data.company = !isEmpty(data.company) ? data.company : "";
  data.from = !isEmpty(data.from) ? data.from : "";


  if (validator.isEmpty(data.position)) {
    errors.position = `Position required`;
  }

  
  if (validator.isEmpty(data.company)) {
    errors.company = `company name required`;
  }

  
  if (validator.isEmpty(data.from)) {
    errors.from = `From date required`;
  }


  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};