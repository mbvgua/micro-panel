
delimiter #

-- auto-update disbursment date on loan approval
CREATE TRIGGER disbursment_date_trigger
BEFORE UPDATE ON loans
FOR EACH ROW
BEGIN
    IF NEW.status = 'approved' AND OLD.status <> 'approved' THEN
        SET NEW.disbursment_date = CURRENT_TIMESTAMP;
    END IF;
END#

delimiter ;
