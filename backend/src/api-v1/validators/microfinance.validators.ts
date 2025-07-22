import Joi from "joi";

export const registerMicroFinanceSchema = Joi.object({
  reg_number: Joi.string().required().max(150).trim().messages({
    "string.base": "Reg number must be a string",
    "any.required": "Reg number is required",
    "string.max": "Reg number cannot exceed {#limit} chaarcters",
    "string.trim": "Reg number cannot have leading or trailing whitespace",
  }),
  name: Joi.string().required().lowercase().max(60).messages({
    "string.base": "Microfinance name must be a string",
    "any.required": "Microfinance name is required",
    "string.lowercase": "Microfinance name can only be in lowercase",
    "string.max": "Microfinance name cannot exceed {#limit} characters",
  }),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.base": "Email must be a string",
      "any.required": "Email is required",
      "string.email":
        "Email can only have two domains, e.g example.com whose tlds can either be '.com' or '.net'",
    }),
  phone_number: Joi.string().required().min(10).max(10).messages({
    "string.base": "Phone number must be a string",
    "any.required": "Phone number is required",
    "string.min": "Phone number needs to have a min length of {#limit} digits",
    "string.max": "Phone number needs to have a max length of {#limit} digits",
  }),
  location: Joi.string().required().messages({
    "string.base": "Location must be a string",
    "any.required": "Location is required",
  }),
});

export const updateMicrofinanceSchema = Joi.object({
  microfinance_id: Joi.string().trim().messages({
    "string.base": "Admin id must be a string",
    "string.trim":
      "Admin id cannot contain any whistespace character before or after it",
  }),
  reg_number: Joi.string().max(150).trim().messages({
    "string.base": "Reg number must be a string",
    "string.max": "Reg number cannot exceed {#limit} chaarcters",
    "string.trim": "Reg number cannot have leading or trailing whitespace",
  }),
  name: Joi.string().lowercase().max(60).messages({
    "string.base": "Microfinance name must be a string",
    "string.lowercase": "Microfinance name can only be in lowercase",
    "string.max": "Microfinance name cannot exceed {#limit} characters",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.base": "Email must be a string",
      "string.email":
        "Email can only have two domains, e.g example.com whose tlds can either be '.com' or '.net'",
    }),
  phone_number: Joi.string().min(10).max(10).messages({
    "string.base": "Phone number must be a string",
    "string.min": "Phone number needs to have a min length of {#limit} digits",
    "string.max": "Phone number needs to have a max length of {#limit} digits",
  }),
  location: Joi.string().messages({
    "string.base": "Location must be a string",
  }),
});
