/* Validator config example
{
  field: "email"                         // Required
  chars: "a-zA-Z0-9!@#$%^&*()_+=~`´'\"", // Optional
  len: "3,254",                          // Optional
  rules: [                               // Optional
    /^.{1,2}[a]{1}/,
  ]
}
*/

class Checker {
  constructor(req) {
    this.req = req;
    this.errors = [];
  }

  invalidKey(parm) {
    return (parm === undefined || parm === null || parm === -1);
  }

  validateFields(configArray) {
    configArray.forEach(config => this.validate(config));
  }

  validate(config) {
    if(this.invalidKey(config.field)) {
      return;
    }
    
    let fieldError = {field: config.field, message: null};
    const value = this.req[config.field];

    if(this.invalidKey(value)) {
      fieldError.message = "Campo obrigatório.";
      this.errors.push(fieldError);
      return;
    }

    if(!this.invalidKey(config.len)) {
      const regexLenght = RegExp('^.{' + config.len + '}$');
      if(!regexLenght.test(value)) {
        fieldError.message = "Tamanho inválido.";
        this.errors.push(fieldError);
        return;
      }
    }

    if(!this.invalidKey(config.allowedChars)) {
      const regexChars = RegExp('[^' + config.allowedChars + ']');
      if(regexChars.test(value)) {
        fieldError.message = "Carácter invalido.";
        this.errors.push(fieldError);
        return;
      }
    }

    if(!this.invalidKey(config.rules)) {
      const error = !config.rules.every((rule) => rule.test(value));
      if(error) {
        fieldError.message = "Formato inválido.";
        this.errors.push(fieldError);
        return;
      }
    }

    //if(fieldError.length) {
    //  this.errors.push({field: config.field, message: fieldError});
    //}
  }

  sendStatus(res) {
    if(this.errors.length) {
			res.json({errors: this.errors, status: "error"});
    } else {
      res.json({status: "okay"});
    }
  }
}

export default Checker;
