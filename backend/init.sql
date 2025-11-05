CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(50) NOT NULL, 
    last_name VARCHAR(50) NOT NULL,
    password_hash VARCHAR(60) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(100) NOT NULL,
    join_code VARCHAR(10) UNIQUE NOT NULL,
    created_by INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
    );

CREATE TYPE team_role AS ENUM ('LEADER', 'MEMBER');

CREATE TABLE team_memberships (
    user_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    role team_role NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, team_id)
);

CREATE TYPE task_status AS ENUM (
    'TODO', 
    'IN_PROGRESS', 
    'ON_HOLD', 
    'REVISED', 
    'DONE'
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    task_name VARCHAR(255) NOT NULL,
    task_details TEXT,
    team_id INTEGER NOT NULL REFERENCES teams(team_id) ON DELETE CASCADE,
    creator_id INTEGER NOT NULL REFERENCES users(user_id) ON DELETE RESTRICT,
    assignee_id INTEGER REFERENCES users(user_id) ON DELETE SET NULL,
    task_status task_status NOT NULL DEFAULT 'TODO',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);