import Joi from "joi";

export const adminRegSchema = Joi.object({
  first_name: Joi.string().required().alphanum().lowercase().trim().messages({
    "string.base": "First name must be a string",
    "any.required": "First name is required",
    "string.alphanum":
      "First name can only contain letters(a-z) and digits(0-9)",
    "string.lowercase": "First name can only be in lowercase",
    "string.trim":
      "First name cannot contain any whitespace before or after it",
  }),
  last_name: Joi.string().required().alphanum().lowercase().trim().messages({
    "string.base": "Last name must be a string",
    "any.required": "Last name is required",
    "string.alphanum":
      "Last name can only contain letters(a-z) and digits(0-9)",
    "string.lowercase": "Last name can only be in lowercase",
    "string.trim": "Last name cannot contain any whitespace before or after it",
  }),
  user_name: Joi.string()
    .required()
    .alphanum()
    .lowercase()
    .trim()
    .min(3)
    .max(20)
    .messages({
      "string.base": "Username must be a string",
      "any.required": "Username is required",
      "string.alphanum":
        "Username can only contain letters(a-z) and digits(0-9)",
      "string.lowercase": "Username can only be in lowercase",
      "string.trim": "Username cannot contain whitespace before or after it",
      "string.min": "Username must have a minimum of {#length} characters",
      "string.max": "Username must have a maximum of {#length} characters",
    }),
  user_email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.base": "Email msut be a string",
      "any.required": "Email is required",
      "string.email":
        "Email can only have two domains, e.g example.com whose tlds can either be '.com' or '.net'",
    }),
  phone_number: Joi.string().required().min(10).max(10).messages({
    "string.base": "Phone number must be a string",
    "any.required": "Phone number is required",
    "string.min": "Phone number needs to have a min length of {#length} digits",
    "string.max": "Phone number needs to have a max length of {#length} digits",
  }),
  password: Joi.string()
    .required()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$",
      ),
    )
    .messages({
      "string.base": "Password must be a string",
      "any.required": "Password is required",
      "string.pattern.base":
        "Password must contain atleast one lowercase letter,one uppercase letter, one digit and one special character",
    }),
});
