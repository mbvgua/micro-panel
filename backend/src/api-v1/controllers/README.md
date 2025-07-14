# Controllers

This subdirectory will host the main logic for various enpoints within the application. In the order in which they have been built, I have:

- [admin-controller](##admin-controller)
- [member-controller](##member-controller)


## Admin Controller

Incharge of adminstration logic. Has two endpoints:
- **adminRegistration** => will register new admins into the system. Some nice-to-knows from this endpoint are that:
    1. It has some hardcoded values: `sacco_id` is set to `0000` which will be the default sacco for all admins, as each user has to be linked to a sacco. `user_role` is set automatically to `admin` through use of an enumeration type from the models. `status` of admins is `active` by default, though this will be pending in other users.
    2. Appropriate validation is done with the `Joi` module for values inputted in the request body. A detailed view of the validation schema can be found [here](../validators/admin.validators.ts)
    3. The `uid` module helps to create a random id string that is more secure that the `AUTO INCREMENT` value as one can easily guess that. Also the `bcrypt` module helps to ensure hashing of the passwords, such that even if the database becomes compromised, one cannot identify the users passwords.

- **adminLogin** => admin can login either using a combination of their username or email alongside their password. The regex pattern identifies if either the email or username was used, then redirects code flow to the appropriate logical section. Appropriate validation is done for user input in each, with adequate error messages. `bcrypt` is also used to compare the user input password with that in the db(which is hashed). If they match, user will be logged in. 

## Sacco Controller


## Member Controller

This works on the <strikethrough>users</strikethrough> members logic. It has 3 main endpoints:
- **createMember** => the admin(created through the endpoints above), will create a new member in the system. Logic validation is done to ensure only admins can perform this action and appropriate validation is done on the input values with `Joi`. For a detailed view, schema can be found [here](../validators/member.validators.ts). This endpoint will have some hardcoded values, namely; `role` as `member`, `status` as `pending`.
- **getMembers** => return a list of all members registered in the system. No logic or schema validation was done here as nothing was being passed in the request body. Will look into performing **pagination** of the list, in instances where it is really long.  
- **activateMember** => will activate a member by changing `status` from `pending` to `active`. This action can only be performed by the admins, and appropriate logic validation is in place to ensure that.


## Loan Controller


