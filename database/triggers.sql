
delimiter #

-- auto-update disbursment date on loan approval
CREATE TRIGGER disbursment_date_trigger
AFTER UPDATE 
ON loans 
FOR EACH ROW
BEGIN
    IF NEW.status = 'approved' THEN
        UPDATE loans SET
        OLD.disbursment_date=CURRENT_TIMESTAMP;
    END IF;
END#


delimiter ;
