 const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.skills = !isEmpty(data.skills) ? data.skills : "";

  if (!validator.isLength(data.handle,{min:2,max:40})) {
    errors.handle = `handle b/w 2 and 40 chars`;
  }

  if (validator.isEmpty(data.handle)) {
    errors.handle = `handle required`;
  }

  if (validator.isEmpty(data.status)) {
    errors.status = `status required`;
  }

  if (validator.isEmpty(data.skills)) {
    errors.skills = `skills required`;
  }
  


  if(!isEmpty(data.website)){
      if(!validator.isURL(data.website)){
          errors.website="not valid URL"
      }
  }

  if(!isEmpty(data.youtube)){
    if(!validator.isURL(data.youtube)){
        errors.youtube="not valid URL"
    }
}

if(!isEmpty(data.linkedin)){
    if(!validator.isURL(data.linkedin)){
        errors.linkedin="not valid URL"
    }
}

if(!isEmpty(data.facebook)){
    if(!validator.isURL(data.facebook)){
        errors.facebook="not valid URL"
    }
}



  return {
    errors,
    isValid: isEmpty(errors)
  };
};
