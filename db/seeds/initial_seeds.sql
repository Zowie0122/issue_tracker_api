INSERT INTO companies(name)
VALUES ('Tom and Jerry Finance'),
    ('Rescue Rangers Tech');
INSERT INTO departments(company_id, name)
VALUES (1, 'Management'),
    (1, 'Finance'),
    (1, 'HR'),
    (2, 'Management'),
    (2, 'IT'),
    (2, 'HR');
INSERT INTO roles(name)
VALUES ('Admin'),
    ('User');
INSERT INTO users(
        first_name,
        last_name,
        email,
        password,
        company_id,
        role_id,
        department_id
    )
VALUES (
        'Tom',
        'Cat',
        'tom@tomandjerry.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        1,
        2,
        3
    ),
    (
        'Jerry',
        'Mouse',
        'jerry@tomandjerry.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        1,
        2,
        2
    ),
    (
        'Admin',
        'Dog',
        'admin@tomandjerry.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        1,
        1,
        3
    ),
    (
        'Chip',
        'Munk',
        'chip@rescuerangers.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        2,
        2,
        2
    ),
    (
        'Dale',
        'Munk',
        'dale@rescuerangers.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        2,
        2,
        2
    ),
    (
        'Admin',
        'Butterfly',
        'admin@rescuerangers.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        2,
        1,
        3
    );