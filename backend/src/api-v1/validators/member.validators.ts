import Joi from "joi";

export const memberRegSchema = Joi.object({
  admin_id: Joi.string().required().trim().messages({
    "string.base": "Admin id must be a string",
    "any.required": "Admin id is required",
    "string.trim":
      "Admin id cannot contain any whistespace character before or after it",
  }),
  microfinance_id: Joi.string().required().trim().messages({
    "string.base": "Microfinance id must be a string",
    "any.required": "Microfinance id is required",
    "string.trim":
      "Microfinance id cannot contain any whistespace character before or after it",
  }),
  firstname: Joi.string().required().alphanum().lowercase().trim().messages({
    "string.base": "First name must be a string",
    "any.required": "First name is required",
    "string.alphanum":
      "First name can only contain letters(a-z) and digits(0-9)",
    "string.lowercase": "First name can only be in lowercase",
    "string.trim":
      "First name cannot contain any whitespace before or after it",
  }),
  lastname: Joi.string().required().alphanum().lowercase().trim().messages({
    "string.base": "Last name must be a string",
    "any.required": "Last name is required",
    "string.alphanum":
      "Last name can only contain letters(a-z) and digits(0-9)",
    "string.lowercase": "Last name can only be in lowercase",
    "string.trim": "Last name cannot contain any whitespace before or after it",
  }),
  username: Joi.string()
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
      "string.min": "Username must have a minimum of {#limit} characters",
      "string.max": "Username must have a maximum of {#limit} characters",
    }),
  email: Joi.string()
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
    "string.min": "Phone number needs to have a min length of {#limit} digits",
    "string.max": "Phone number needs to have a max length of {#limit} digits",
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

export const updateMemberSchema = Joi.object({
  user_id: Joi.string().trim().messages({
    "string.base": "User id must be a string",
    "string.trim":
      "User id cannot contain any whistespace character before or after it",
  }),
  microfinance_id: Joi.string().trim().messages({
    "string.base": "Microfinance id must be a string",
    "string.trim":
      "Microfinance id cannot contain any whistespace character before or after it",
  }),
  firstname: Joi.string().alphanum().lowercase().trim().messages({
    "string.base": "First name must be a string",
    "string.alphanum":
      "First name can only contain letters(a-z) and digits(0-9)",
    "string.lowercase": "First name can only be in lowercase",
    "string.trim":
      "First name cannot contain any whitespace before or after it",
  }),
  lastname: Joi.string().alphanum().lowercase().trim().messages({
    "string.base": "Last name must be a string",
    "string.alphanum":
      "Last name can only contain letters(a-z) and digits(0-9)",
    "string.lowercase": "Last name can only be in lowercase",
    "string.trim": "Last name cannot contain any whitespace before or after it",
  }),
  username: Joi.string().alphanum().lowercase().trim().min(3).max(20).messages({
    "string.base": "Username must be a string",
    "string.alphanum": "Username can only contain letters(a-z) and digits(0-9)",
    "string.lowercase": "Username can only be in lowercase",
    "string.trim": "Username cannot contain whitespace before or after it",
    "string.min": "Username must have a minimum of {#limit} characters",
    "string.max": "Username must have a maximum of {#limit} characters",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.base": "Email msut be a string",
      "string.email":
        "Email can only have two domains, e.g example.com whose tlds can either be '.com' or '.net'",
    }),
  phone_number: Joi.string().min(10).max(10).messages({
    "string.base": "Phone number must be a string",
    "string.min": "Phone number needs to have a min length of {#limit} digits",
    "string.max": "Phone number needs to have a max length of {#limit} digits",
  }),
  password: Joi.string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,10}$",
      ),
    )
    .messages({
      "string.base": "Password must be a string",
      "string.pattern.base":
        "Password must contain atleast one lowercase letter,one uppercase letter, one digit and one special character",
    }),
});
