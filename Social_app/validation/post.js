const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if(!validator.isLength(data.text,{min:1,max:50})){
      errors.text = "text length min 1 and max 50"
  }

  if(validator.isEmpty(data.text)){
errors.text = "text is required"

  }



  return {
    errors,
    isValid: isEmpty(errors)
  };
};