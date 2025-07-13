-- create the db
CREATE DATABASE micro_panel;

-- use the db
USE micro_panel;

CREATE TABLE microfinances(
    id VARCHAR(255) PRIMARY KEY,
    reg_number VARCHAR(255) UNIQUE,
    name VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    created_at DATE DEFAULT(CURRENT_DATE),
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status ENUM('active','inactive','pending'),
    is_deleted BOOLEAN DEFAULT 0
);

-- sacco indexes
CREATE INDEX microfinance_status_index ON microfinances(status);

-- dummy values
INSERT INTO microfinances(id,reg_number,name,email,phone_number,location,status)
VALUES ('0000', '000-000', 'Dummy Sacco', 'dummysacco@sacco.com', '0700000001', 'anywhere', 'active');

CREATE TABLE users(
    id VARCHAR(255) PRIMARY KEY,
    microfinance_id VARCHAR(255) NOT NULL,
    firstname VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL,
    username VARCHAR(100) UNIQUE,
    email VARCHAR(100) UNIQUE,
    phone_number VARCHAR(100) UNIQUE,
    hashed_password VARCHAR(255) NOT NULL,
    role ENUM('admin','member','support') NOT NULL,
    status ENUM('active','pending') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted BOOLEAN DEFAULT 0,
    FOREIGN KEY (microfinance_id) REFERENCES microfinances(id)
);

-- indexes
CREATE INDEX user_role_index ON users(role);
CREATE INDEX user_status_index ON users(status);

-- dummy values
INSERT INTO users(id,microfinance_id,firstname,lastname,username,email,phone_number,hashed_password,role,status)
VALUES ('09d05331-7977-423f-9dcf-905c46084aa9','0000','place','holder','admin','admin@gmail.com','0700000000','61d805ee-42cf-4c1d-9ffd-baa70b7d5fd2','admin','active');


CREATE TABLE loans(
    id VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255),
    microfinance_id VARCHAR(255),
    type ENUM('emergency','development','work','miscallenous') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    interest_rate DECIMAL(5,2) NOT NULL,
    repayment_period ENUM('1','3','6','12') NOT NULL,
    status ENUM('pending','approved','rejected') DEFAULT 'pending' NOT NULL,
    disbursment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    guarantor_details JSON NOT NULL,
    is_cleared BOOLEAN DEFAULT 0,
    is_deleted BOOLEAN DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (microfinance_id) REFERENCES microfinances(id)
);

-- indexes
CREATE INDEX loan_type_index ON loans(type);
CREATE INDEX loan_amount_index ON loans(amount);
CREATE INDEX loan_repayment_period_index ON loans(repayment_period);


