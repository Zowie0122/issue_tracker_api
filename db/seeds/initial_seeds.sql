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
        id,
        first_name,
        last_name,
        email,
        password,
        company_id,
        role_id,
        department_id
    )
VALUES (
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        'Tom',
        'Cat',
        'tom@tomandjerry.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        1,
        2,
        3
    ),
    (
        'c3b74197-f14b-4a02-a394-0246eda6e84d',
        'Jerry',
        'Mouse',
        'jerry@tomandjerry.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        1,
        2,
        2
    ),
    (
        'a64b4218-934a-4510-814c-830e93e2e387',
        'Admin',
        'Dog',
        'admin@tomandjerry.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        1,
        1,
        3
    ),
    (
        'f05b01be-376b-4c95-8405-4b7189454795',
        'Chip',
        'Munk',
        'chip@rescuerangers.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        2,
        2,
        2
    ),
    (
        '460b191e-dc24-47e3-a32b-db65a61243d3',
        'Dale',
        'Munk',
        'dale@rescuerangers.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        2,
        2,
        2
    ),
    (
        'f1f90ceb-617f-4dcc-be6f-7321dd58d074',
        'Admin',
        'Butterfly',
        'admin@rescuerangers.com',
        '$2a$12$PqnCBqaGD.KAIYNJNj/SCuE.89fezhFl3wCqUqc5emsGUB8Wv8PSq',
        2,
        1,
        3
    );
INSERT INTO issues(
        title,
        description,
        issuer,
        receiver,
        due_at
    )
VALUES (
        'Test Issue 1',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        'c3b74197-f14b-4a02-a394-0246eda6e84d',
        now() + INTERVAL '10 DAYS'
    ),
    (
        'Test Issue 2',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'c3b74197-f14b-4a02-a394-0246eda6e84d',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        now() + INTERVAL '9 DAYS'
    ),
    (
        'Test Issue 3',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'a64b4218-934a-4510-814c-830e93e2e387',
        'c3b74197-f14b-4a02-a394-0246eda6e84d',
        now() + INTERVAL '8 DAYS'
    ),
    (
        'Test Issue 4',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        'a64b4218-934a-4510-814c-830e93e2e387',
        now() + INTERVAL '7 DAYS'
    ),
    (
        'Test Issue 5',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'a64b4218-934a-4510-814c-830e93e2e387',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        now() + INTERVAL '6 DAYS'
    ),
    (
        'Test Issue 6',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'a64b4218-934a-4510-814c-830e93e2e387',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        now() + INTERVAL '6 DAYS'
    ),
    (
        'Test Issue 7',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        'a64b4218-934a-4510-814c-830e93e2e387',
        now() + INTERVAL '6 DAYS'
    ),
    (
        'Test Issue 8',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        'c3b74197-f14b-4a02-a394-0246eda6e84d',
        now() + INTERVAL '6 DAYS'
    ),
    (
        'Test Issue 9',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'a64b4218-934a-4510-814c-830e93e2e387',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        now() + INTERVAL '6 DAYS'
    ),
    (
        'Test Issue 10',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'c3b74197-f14b-4a02-a394-0246eda6e84d',
        'c74526f6-3a78-44bf-836b-af5c932571d0',
        now() + INTERVAL '6 DAYS'
    ),
    (
        'Test Issue 11',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'f05b01be-376b-4c95-8405-4b7189454795',
        '460b191e-dc24-47e3-a32b-db65a61243d3',
        now() + INTERVAL '10 DAYS'
    ),
    (
        'Test Issue 12',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        '460b191e-dc24-47e3-a32b-db65a61243d3',
        'f05b01be-376b-4c95-8405-4b7189454795',
        now() + INTERVAL '9 DAYS'
    ),
    (
        'Test Issue 13',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'f1f90ceb-617f-4dcc-be6f-7321dd58d074',
        '460b191e-dc24-47e3-a32b-db65a61243d3',
        now() + INTERVAL '8 DAYS'
    ),
    (
        'Test Issue 14',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        'f05b01be-376b-4c95-8405-4b7189454795',
        '460b191e-dc24-47e3-a32b-db65a61243d3',
        now() + INTERVAL '7 DAYS'
    ),
    (
        'Test Issue 15',
        'It was a concerning development that he couldn get out of his mind. He had many friends throughout his early years and had fond memories of playing with them, but he couldn understand how it had all stopped.There was some point as he grew up that he played with each of his friends for the very last time, and he had no idea that it would be the last.',
        '460b191e-dc24-47e3-a32b-db65a61243d3',
        'f05b01be-376b-4c95-8405-4b7189454795',
        now() + INTERVAL '6 DAYS'
    );