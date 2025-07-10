import Joi from "joi";

export const registerMicroFinanceSchema = Joi.object({
  registration_number: Joi.string().required().max(150).trim().messages({
    "string.base": "Reg number must be a string",
    "any.required": "Reg number is required",
    "string.max": "Reg number cannot exceed {#length} chaarcters",
    "string.trim": "Reg number cannot have leading or trailing whitespace",
  }),
  sacco_name: Joi.string().required().alphanum().lowercase().max(60).messages({
    "string.base": "Microfinance name must be a string",
    "any.required": "Microfinance name is required",
    "string.alphanum":
      "Microfinance name can only contain letters(a-z) and digits(0-9)",
    "string.lowercase": "Microfinance name can only be in lowercase",
    "string.max": "Microfinance name cannot exceed {#length} characters",
  }),
  sacco_email: Joi.string()
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
  sacco_phone_number: Joi.string().required().min(10).max(10).messages({
    "string.base": "Phone number must be a string",
    "any.required": "Phone number is required",
    "string.min": "Phone number needs to have a min length of {#length} digits",
    "string.max": "Phone number needs to have a max length of {#length} digits",
  }),
  location: Joi.string().required().messages({
    "string.base": "Location must be a string",
    "any.required": "Location is required",
  }),
});
