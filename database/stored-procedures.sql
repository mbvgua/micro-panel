
delimiter #

-- addUser
CREATE PROCEDURE addUser(
    IN id VARCHAR(255),
    IN microfinance_id VARCHAR(255),
    IN firstname VARCHAR(100),
    IN lastname VARCHAR(100),
    IN username VARCHAR(100),
    IN email VARCHAR(100),
    IN phone_number VARCHAR(100),
    IN hashed_password VARCHAR(255),
    IN role ENUM('admin','member','support'),
    IN status ENUM('active','pending')
)
BEGIN
    INSERT INTO users(id,microfinance_id,firstname,lastname,username,email,phone_number,hashed_password,role,status)
    VALUES(id,microfinance_id,firstname,lastname,username,email,phone_number,hashed_password,role,status);
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
    IN username_or_email VARCHAR(100)
)
BEGIN
    SELECT * FROM users
    WHERE (username=username_or_email OR email=username_or_email)
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
    SELECT * FROM users
    WHERE (status="pending" AND id=user_id)
    AND is_deleted=0;
END#

-- activateUserById
CREATE PROCEDURE activateUserById(
    IN user_id VARCHAR(255)
)
BEGIN
    UPDATE users
    SET status="active" WHERE id=user_id;
END#

--updateUser
CREATE PROCEDURE updateUser(
    IN user_id VARCHAR(255),
    IN new_microfinance_id VARCHAR(255),
    IN new_firstname VARCHAR(100),
    IN new_lastname VARCHAR(100),
    IN new_username VARCHAR(100),
    IN new_email VARCHAR(100),
    IN new_phone_number VARCHAR(100),
    IN new_hashed_password VARCHAR(255)
)
BEGIN
    UPDATE users SET microfinance_id=new_microfinance_id,firstname=new_firstname,lastname=new_lastname,username=new_username,email=new_email,phone_number=new_phone_number,hashed_password=new_hashed_password WHERE id=user_id;
END#

--deleteUser
CREATE PROCEDURE deleteUser(
    IN user_id VARCHAR(255)
)
BEGIN
    UPDATE users SET is_deleted=1 WHERE id=user_id;
END#

-- createMicrofinance
CREATE PROCEDURE addMicrofinance(
    IN id VARCHAR(255),
    IN reg_number VARCHAR(100),
    IN name VARCHAR(100),
    IN email VARCHAR(100),
    IN phone_number VARCHAR(100),
    IN location VARCHAR(100),
    IN status ENUM("active","inactive","pending")
)
BEGIN
    INSERT INTO microfinances(id,reg_number,name,email,phone_number,location,status)
    VALUES (id,reg_number,name,email,phone_number,location,status);
END#

-- getAllMicrofinances
CREATE PROCEDURE getAllMicrofinances()
BEGIN
    SELECT * FROM microfinances WHERE is_deleted=0;
END#

--getMicrofinanceById
CREATE PROCEDURE getMicrofinanceById(
    IN microfinance_id VARCHAR(255)
)
BEGIN
    SELECT * FROM microfinances WHERE id=microfinance_id AND is_deleted=0;
END#

--updateMicrofinance
CREATE PROCEDURE updateMicrofinance(
    IN microfinance_id VARCHAR(255),
    IN new_reg_number VARCHAR(100),
    IN new_name VARCHAR(100),
    IN new_email VARCHAR(100),
    IN new_phone_number VARCHAR(100),
    IN new_location VARCHAR(100)
)
BEGIN
    UPDATE microfinances SET reg_number=new_reg_number,name=new_name,email=new_email,phone_number=new_phone_number,location=new_location WHERE id=microfinance_id;
END#

--deleteMicrofinance
CREATE PROCEDURE deleteMicrofinance(
    IN microfinance_id VARCHAR(255)
)
BEGIN
    UPDATE microfinances SET is_deleted=1 WHERE id=microfinance_id;
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
    IN microfinance_id VARCHAR(255),
    IN type ENUM('emergency','development','work','miscallenous'),
    IN amount DECIMAL(10,2),
    IN interest_rate DECIMAL(5,2),
    IN repayment_period ENUM('1','3','6','12'),
    IN guarantor_details JSON
)
BEGIN
    INSERT INTO loans(id,user_id,microfinance_id,type,amount,interest_rate,repayment_period,guarantor_details)
    VALUES (id,user_id,microfinance_id,type,amount,interest_rate,repayment_period,guarantor_details);
END#

-- getAllLoans
CREATE PROCEDURE getAllLoans()
BEGIN
    SELECT * FROM loans WHERE is_deleted=0;
END#

--getLoanById
CREATE PROCEDURE getLoanById(
    IN loan_id VARCHAR(255)
)
BEGIN
    SELECT * FROM loans WHERE id=loan_id AND is_deleted=0;
END#

-- get view of detailed loans
CREATE PROCEDURE getDetailedLoans()
BEGIN
    SELECT * FROM detailed_loans_view;
END#

--updateLoan
CREATE PROCEDURE updateLoan(
    IN loan_id VARCHAR(255),
    IN new_type ENUM('emergency','development','work','miscallenous'),
    IN new_amount DECIMAL(10,2),
    IN new_interest_rate DECIMAL(5,2),
    IN new_repayment_period ENUM('1','3','6','12')
)
BEGIN
    UPDATE loans SET type=new_type,amount=new_amount,interest_rate=new_interest_rate,repayment_period=new_repayment_period WHERE id=loan_id;
END#

--deleteLoan
CREATE PROCEDURE deleteLoan(
    IN loan_id VARCHAR(255)
)
BEGIN
    UPDATE loans SET is_deleted=1 WHERE id=loan_id;
END#

delimiter ;



