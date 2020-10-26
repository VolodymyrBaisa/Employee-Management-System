USE employeetracker;

--Insert data into department table
INSERT INTO  department
(name)
VALUES 
    ('Development'), 
    ('Designing'), 
    ('Production'), 
    ('Quality'), 
    ('Human Resource');
--Insert data into role table
INSERT INTO role
(title, salary, department_id)
VALUES
('Developer Lead', '160000', '1'),
('Developer Middle', '110000', '1'),
('Developer Junior', '75000', '1'),
('Designing Lead', '120000', '2'),
('Designing Middle', '90000', '2'),
('Designing Junior', '70000', '2'),
('Prodaction Lead', '110000', '3'),
('Prodaction Junior', '80000', '3'),
('Quality Lead', '120000', '4'),
('Quality Middle', '90000', '4'),
('Quality Junior', '65000', '4'),
('HR Manager', '80000', '5');
--insert data into employee table
INSERT INTO employee
(first_name, last_name, role_id, manager_id)
VALUES
('Yuriy', 'Chekh', '1', null),
('Kevin', 'Barnes', '4', null),
('Eve', 'Psalti', '7', null),
('Veerendra', 'Bhora', '9', null),
('Jeffrey', 'Yapp', '9', null),
('Victoria', 'Nevin', '12', null),
('Keith', 'Goodwin', '2', '1'),
('Jay', 'Bellissimo', '3', '1'),
('Jay', 'Bellissimo', '2', '2'),
('Carlos', 'Belak', '2', '2'),
('Chris', 'Healy', '10', '5'),
('Guenter', 'Sauter', '11', '5');