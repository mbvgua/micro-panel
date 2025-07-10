
delimiter #

-- addUser
CREATE PROCEDURE addUser(
    id VARCHAR(255),
    sacco_id VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    user_name VARCHAR(100),
    user_email VARCHAR(100),
    phone_number VARCHAR(100),
    hashed_password VARCHAR(255),
    user_role ENUM('admin','member','support'),
    user_status ENUM('active','pending')
)
BEGIN
    INSERT INTO users(id,sacco_id,first_name,last_name,user_name,user_email,phone_number,hashed_password,user_role,user_status)
    VALUES(id,sacco_id,first_name,last_name,user_name,user_email,phone_number,hashed_password,user_role,user_status);
END#

-- getUserById
CREATE PROCEDURE getUserById(
    IN user_id VARCHAR(255)
)
BEGIN
    SELECT * FROM users WHERE id=user_id
    AND is_deleted=0;
END#

-- getUserByNameOrEmail
CREATE PROCEDURE getUserByNameOrEmail(
    IN userNameOrEmail VARCHAR(100)
)
BEGIN
    SELECT * FROM users
    WHERE (user_name=userNameOrEmail OR user_email=userNameOrEmail)
    AND is_deleted=0;
END#

-- getAllUsers
CREATE PROCEDURE getAllUsers()
BEGIN
    SELECT * FROM users WHERE is_deleted=0;
END#

-- getInactiveUsers
CREATE PROCEDURE getInactiveUsersById(
    IN user_id VARCHAR(255)
)
BEGIN
    SELECT * FROM users WHERE user_status="pending"
    AND id=user_id AND is_deleted=0;
END#

-- activateUserById
CREATE PROCEDURE activateUserById(
    IN user_id VARCHAR(255)
)
BEGIN
    UPDATE users
    SET user_status="active" WHERE id=user_id;
END#

-- createMicrofinance
CREATE PROCEDURE createMicrofinance(
    IN id VARCHAR(255),
    IN registration_number VARCHAR(100),
    IN sacco_name VARCHAR(100),
    IN sacco_email VARCHAR(100),
    IN sacco_phone_number VARCHAR(100),
    IN location VARCHAR(100),
    IN sacco_status ENUM("active","inactive","pending")
)
BEGIN
    INSERT INTO saccos(id,registration_number,sacco_name,sacco_email,sacco_phone_number,location,sacco_status)
    VALUES (id,registration_number,sacco_name,sacco_email,sacco_phone_number,location,sacco_status);
END#

-- getAllMicrofinances
CREATE PROCEDURE getAllMicrofinances()
BEGIN
    SELECT * FROM saccos;
END#

-- getAllLoans
CREATE PROCEDURE getAllLoans()
BEGIN
    SELECT * FROM loans;
END#

-- getUserLoansById
CREATE PROCEDURE getUserLoansById(
    IN id VARCHAR(255)
)
BEGIN
    SELECT * FROM loans WHERE user_id=id;
END#

-- addLoan
CREATE PROCEDURE addLoan(
    IN id VARCHAR(255),
    IN user_id VARCHAR(255),
    IN sacco_id VARCHAR(255),
    IN loan_type ENUM('emergency','development','work','miscallenous'),
    IN loan_amount DECIMAL(10,2),
    IN interest_rate DECIMAL(5,2),
    IN repayment_period ENUM('1','3','6','12'),
    IN guarantor_details JSON
)
BEGIN
    INSERT INTO loans(id,user_id,sacco_id,loan_type,loan_amount,interest_rate,repayment_period,guarantor_details)
    VALUES (id,user_id,sacco_id,loan_type,loan_amount,interest_rate,repayment_period,guarantor_details);
END#

delimiter ;



