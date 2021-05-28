CREATE DATABASE IF NOT EXISTS todolist;
USE todolist;

CREATE TABLE IF NOT EXISTS Task (
	task_id  INT  AUTO_INCREMENT  PRIMARY KEY,
    task_description VARCHAR(300)  NOT NULL,
    responsible_name VARCHAR(200)  NOT NULL,
    responsible_email VARCHAR(100)  NOT NULL,
    status_isFinished BOOLEAN  NOT NULL,
    status_backCount INT
);