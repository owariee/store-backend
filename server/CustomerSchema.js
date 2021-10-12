import Joi from 'joi';

const CustomerSchema = Joi.object({
  objectId: Joi.string()
    .alphanum()
    .min(24)
    .max(24)
    .alter({
      get: (schema) => schema.required(),
      post: (schema) => schema.forbidden(),
      put: (schema) => schema.required(),
      delete: (schema) => schema.required()
    }),

  firstName: Joi.string()
    .min(2)
    .max(255)
    .pattern(new RegExp(/^[A-Z]/))
    .alter({
      get: (schema) => schema.forbidden(),
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
      delete: (schema) => schema.forbidden()
    }),

  lastName: Joi.string()
    .min(2)
    .max(255)
    .pattern(new RegExp(/^[A-Z]/))
    .alter({
      get: (schema) => schema.forbidden(),
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
      delete: (schema) => schema.forbidden()
    }),

  email: Joi.string()
    .email()
    .max(255)
    .alter({
      get: (schema) => schema.forbidden(),
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
      delete: (schema) => schema.forbidden()
    }),
  
  password: Joi.string()
    .min(12)
    .max(255)
    .alter({
      get: (schema) => schema.forbidden(),
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
      delete: (schema) => schema.forbidden()
    }),
  
  repeatPassword: Joi.ref('password'),

  gender: Joi.string()
    .valid('male', 'female', 'trans')
    .alter({
      get: (schema) => schema.forbidden(),
      post: (schema) => schema.required(),
      put: (schema) => schema.optional(),
      delete: (schema) => schema.forbidden()
    })
})
  .with('password', 'repeatPassword')
  .with('firstName', 'lastName');

export default CustomerSchema;
