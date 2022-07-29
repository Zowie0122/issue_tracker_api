INSERT INTO companies(name)
VALUES ('TOM Corp'),
    ('JERRY Corp');
INSERT INTO departments(company_id, name)
VALUES (1, 'IT'),
    (1, 'Management'),
    (2, 'Finance'),
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
        'John',
        'Doe',
        'johnd@invalid.com',
        'secret',
        1,
        1,
        1
    ),
    (
        'Mary',
        'Zhang',
        'maryz@invalid.com',
        'secret',
        1,
        2,
        2
    ),
    (
        'Susan',
        'Phong',
        'susanp@invalid.com',
        'secret',
        1,
        2,
        2
    ),
    (
        'Mike',
        'Green',
        'mikeg@invalid.com',
        'secret',
        2,
        1,
        2
    ),
    (
        'Nick',
        'Gray',
        'nickg@invalid.com',
        'secret',
        2,
        2,
        2
    );
    