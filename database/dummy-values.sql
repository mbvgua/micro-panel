
-- insert into saccos
INSERT INTO saccos(id,registration_number,sacco_name,sacco_email,sacco_phone_number,location,sacco_status)
VALUES
  ('sacco-001', 'REG-CAM-001', 'Excalibur SACCO', 'excalibur@camelot.com', '0700000001', 'Camelot City', 'active'),
  ('sacco-002', 'REG-CAM-002', 'Round Table SACCO', 'roundtable@camelot.com', '0700000002', 'Avalon', 'active'),
  ('sacco-003', 'REG-CAM-003', 'Holy Grail SACCO', 'holygrail@camelot.com', '0700000003', 'Glastonbury', 'pending'),
  ('sacco-004', 'REG-CAM-004', 'KnightWatch SACCO', 'knightwatch@camelot.com', '0700000004', 'Tintagel', 'inactive'),
  ('sacco-005', 'REG-CAM-005', 'Chivalry SACCO', 'chivalry@camelot.com', '0700000005', 'Logres', 'active');

-- insert into users
INSERT INTO users (id,sacco_id, first_name, last_name, user_name, user_email, phone_number, hashed_password, user_role)
VALUES 
  ('1','sacco-001','Arthur','Pendragon', 'kingarthur', 'arthur@camelot.com', '0711000001', '@Excalibur25', 'admin'),
  ('2','sacco-002', 'Lancelot', 'Lance', 'lancelot', 'lancelot@camelot.com', '0711000002', '@Excalibur25', 'admin'),
  ('3','sacco-001', 'Gawain', 'Gawie', 'gawain', 'gawain@camelot.com', '0711000003', '@Excalibur25', 'member'),
  ('4','sacco-003','Percival','Perce', 'percival', 'percival@camelot.com', '0711000004', '@Excalibur25', 'member'),
  ('5','sacco-004', 'Galahad', 'Gala', 'galahad', 'galahad@camelot.com', '0711000005', '@Excalibur25', 'member');

-- insert into loans
INSERT INTO loans (id,user_id,sacco_id,loan_type,loan_amount,interest_rate,repayment_period,loan_status)
VALUES
  ('loan-001', '3', 'sacco-001', 'development', 10000.00, 5.00, '12','approved'),
  ('loan-002', '4', 'sacco-003', 'emergency', 2500.00, 3.50, '3','approved'),
  ('loan-003', '3', 'sacco-001', 'work', 7500.00, 4.25, '6','pending'),
  ('loan-004', '4', 'sacco-003', 'miscallenous', 1500.00, 2.00, '1','pending'),
  ('loan-005', '5', 'sacco-004', 'development', 5000.00, 6.50, '6','approved');
