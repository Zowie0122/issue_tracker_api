CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE "users" (
  "id" uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
  "first_name" varchar,
  "last_name" varchar,
  "email" varchar UNIQUE,
  "password" varchar,
  "company_id" int,
  "role_id" int,
  "department_id" int,
  "created_at" timestamptz DEFAULT (now()),
  "status" int DEFAULT 1
);
CREATE TABLE "issues" (
  "id" bigserial PRIMARY KEY,
  "title" varchar NOT NULL,
  "description" varchar,
  "issuer" uuid NOT NULL,
  "receiver" uuid NOT NULL,
  "due_at" timestamptz NOT NULL,
  "created_at" timestamptz DEFAULT (now()),
  "updated_at" timestamptz DEFAULT (now()),
  "status" int DEFAULT 0
);
CREATE TABLE "comments" (
  "id" bigserial PRIMARY KEY,
  "issue_id" int NOT NULL,
  "contents" varchar NOT NULL,
  "issuer" uuid NOT NULL,
  "receiver" uuid,
  "created_at" timestamptz DEFAULT (now())
);
CREATE TABLE "roles" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL
);
CREATE TABLE "departments" (
  "id" bigserial PRIMARY KEY,
  "company_id" int,
  "name" varchar NOT NULL
);
CREATE TABLE "companies" (
  "id" bigserial PRIMARY KEY,
  "name" varchar NOT NULL
);
COMMENT ON COLUMN "users"."status" IS 'active user 1, deleted user 0';
COMMENT ON COLUMN "issues"."status" IS 'unsolved, 0, resolved 1';
ALTER TABLE "users"
ADD CONSTRAINT fk_company_user FOREIGN KEY ("company_id") REFERENCES "companies" ("id");
ALTER TABLE "users"
ADD CONSTRAINT fk_role_user FOREIGN KEY ("role_id") REFERENCES "roles" ("id");
ALTER TABLE "users"
ADD CONSTRAINT fk_department_user FOREIGN KEY ("department_id") REFERENCES "departments" ("id");
ALTER TABLE "issues"
ADD CONSTRAINT fk_user_issue_issuer FOREIGN KEY ("issuer") REFERENCES "users" ("id");
ALTER TABLE "issues"
ADD CONSTRAINT fk_user_issue_receiver FOREIGN KEY ("receiver") REFERENCES "users" ("id");
ALTER TABLE "comments"
ADD CONSTRAINT fk_user_comment_issue FOREIGN KEY ("issue_id") REFERENCES "issues" ("id");
ALTER TABLE "comments"
ADD CONSTRAINT fk_user_comment_issuer FOREIGN KEY ("issuer") REFERENCES "users" ("id");
ALTER TABLE "comments"
ADD CONSTRAINT fk_user_comment_receiver FOREIGN KEY ("receiver") REFERENCES "users" ("id");
ALTER TABLE "departments"
ADD CONSTRAINT fk_company_department FOREIGN KEY ("company_id") REFERENCES "companies" ("id");