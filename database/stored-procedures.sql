
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

-- getActiveUsers
CREATE PROCEDURE getActiveUsers()
BEGIN
    SELECT * FROM users WHERE user_status="active"
    AND is_deleted=0;
END#

-- getAllUsers
CREATE PROCEDURE getAllUsers()
BEGIN
    SELECT * FROM users WHERE is_deleted=0;
END#

delimiter ;



