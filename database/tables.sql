-- create the db
CREATE DATABASE micro_panel;

-- use the db
USE micro_panel;

CREATE TABLE saccos(
    id VARCHAR(255) PRIMARY KEY,
    registration_number VARCHAR(255) UNIQUE,
    sacco_name VARCHAR(100) UNIQUE,
    sacco_email VARCHAR(100) UNIQUE,
    sacco_phone_number VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    created_at DATE DEFAULT(CURRENT_DATE),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    sacco_status ENUM('active','inactive','pending')
);

-- sacco indexes
CREATE INDEX sacco_status_index ON saccos(sacco_status);

-- dummy values
INSERT INTO saccos(id,registration_number,sacco_name,sacco_email,sacco_phone_number,location,sacco_status)
VALUES ('0000', '000-000', 'Dummy Sacco', 'dummysacco@sacco.com', '0700000001', 'anywhere', 'active');

CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    sacco_id VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    user_name VARCHAR(100) UNIQUE,
    user_email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(100) UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    user_role ENUM('admin','member','support') NOT NULL,
    user_status ENUM('active','pending') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT 0,
    FOREIGN KEY (sacco_id) REFERENCES saccos(id)
);

-- indexes
CREATE INDEX user_role_index ON users(user_role);
CREATE INDEX user_status_index ON users(user_status);

-- dummy values
INSERT INTO users(id,sacco_id,first_name,last_name,user_name,user_email,phone_number,hashed_password,user_role,user_status)
VALUES ('09d05331-7977-423f-9dcf-905c46084aa9','0000','place','holder','admin','admin@gmail.com','0700000000','61d805ee-42cf-4c1d-9ffd-baa70b7d5fd2','admin','active');


CREATE TABLE loans(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    sacco_id VARCHAR(255),
    loan_type ENUM('emergency','development','work','miscallenous') NOT NULL,
    loan_amount DECIMAL(10,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    repayment_period ENUM('1','3','6','12') NOT NULL,
    loan_status ENUM('pending','approved','rejected') DEFAULT 'pending' NOT NULL,
    disbursment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    guarantor_details JSON,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (sacco_id) REFERENCES saccos(id)
);

-- indexes
CREATE INDEX loan_type_index ON loans(loan_type);
CREATE INDEX loan_amount_index ON loans(loan_amount);
CREATE INDEX repayment_period_index ON loans(repayment_period);


