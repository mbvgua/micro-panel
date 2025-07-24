import Joi from "joi";

export const loanSchema = Joi.object({
  admin_id: Joi.string().required().trim().messages({
    "string.base": "Admin id must be a string",
    "any.required": "Admin id is required",
    "string.trim":
      "Admin id cannot contain any whistespace character before or after it",
  }),
  user_id: Joi.string().required().trim().messages({
    "string.base": "User id must be a string",
    "any.required": "User id is required",
    "string.trim":
      "User id cannot contain any whistespace character before or after it",
  }),
  microfinance_id: Joi.string().required().trim().messages({
    "string.base": "Microfinance id must be a string",
    "any.required": "Microfinance id is required",
    "string.trim":
      "Microfinance id cannot contain any whistespace character before or after it",
  }),
  type: Joi.string()
    .required()
    .valid("emergency", "development", "work", "miscallenous")
    .trim()
    .messages({
      "string.base": "Loan type must be a string",
      "any.required": "Loan type is required",
      "any.valid":
        "Loan type can either be 'emergency','development','work' or 'miscallenous'",
      "string.trim":
        "Loan type cannot have any leading or trailing whitespace characters",
    }),
  amount: Joi.number().required().min(1).max(1000000).precision(2).messages({
    "number.base": "Loan amount must be a number",
    "any.required": "Loan amount is required",
    "number.min": "Loan amount cannot be lower that {#limit}",
    "number.max": "Loan amount cannot be higher than {#limit}",
    "number.integer": "Loan amount needs be to two decimal places",
  }),
  interest_rate: Joi.number().required().min(0).max(100).precision(2).messages({
    "number.base": "Interest rate must be a number",
    "any.required": "Interest rate is required",
    "number.min": "Interest rate cannot be lower that {#limit}",
    "number.max": "Interest rate cannot be higher than {#limit}",
    "number.integer": "Interest rate needs be to two decimal places",
  }),
  repayment_period: Joi.number().required().valid(1, 3, 6, 12).messages({
    "number.base": "Repayment period must be a number",
    "any.required": "Repayment period is required",
    "any.valid": "Repayment period can either be '1','3','6' or '12'",
  }),
  guarantor_details: Joi.object({
    id: Joi.string().required().messages({
      "any.required": "Guarantor id is required",
    }),
    phone_number: Joi.string().required().messages({
      "any.required": "Guarantor phone number is required",
    }),
    email: Joi.string().required().messages({
      "any.required": "Guarantor email is required",
    }),
    relationship: Joi.string().required().messages({
      "any.required": "Guarantor relationship is required",
    }),
  }).required(),
});

export const updateLoanSchema = Joi.object({
  loan_id: Joi.string().trim().messages({
    "string.base": "Loan id must be a string",
    "string.trim":
      "Loan id cannot contain any whistespace character before or after it",
  }),
  type: Joi.string()
    .valid("emergency", "development", "work", "miscallenous")
    .trim()
    .messages({
      "string.base": "Loan type must be a string",
      "any.valid":
        "Loan type can either be 'emergency','development','work' or 'miscallenous'",
      "string.trim":
        "Loan type cannot have any leading or trailing whitespace characters",
    }),
  amount: Joi.number().min(1).max(1000000).precision(2).messages({
    "number.base": "Loan amount must be a number",
    "number.min": "Loan amount cannot be lower that {#limit}",
    "number.max": "Loan amount cannot be higher than {#limit}",
    "number.integer": "Loan amount needs be to two decimal places",
  }),
  interest_rate: Joi.number().min(0).max(100).precision(2).messages({
    "number.base": "Interest rate must be a number",
    "number.min": "Interest rate cannot be lower that {#limit}",
    "number.max": "Interest rate cannot be higher than {#limit}",
    "number.integer": "Interest rate needs be to two decimal places",
  }),
  repayment_period: Joi.number().valid(1, 3, 6, 12).messages({
    "number.base": "Repayment period must be a number",
    "any.valid": "Repayment period can either be '1','3','6' or '12'",
  }),
});
