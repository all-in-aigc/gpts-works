
CREATE TABLE gpts (
    id SERIAL PRIMARY KEY,
    uuid VARCHAR(255) UNIQUE NOT NULL,
    org_id VARCHAR(255),
    name VARCHAR(255),
    description TEXT,
    avatar_url TEXT,
    short_url VARCHAR(255),
    author_id VARCHAR(255),
    author_name VARCHAR(255),
    created_at timestamptz,
    updated_at timestamptz,
    detail JSON,
    index_updated_at INT NOT NULL DEFAULT 0,
    is_recommended BOOLEAN,
    sort INTEGER NOT NULL DEFAULT 0,
    rating SMALLINT
);

CREATE TABLE user_gpts (
    id SERIAL PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    gpts_uuid VARCHAR(255) NOT NULL,
    created_at timestamptz,
    CONSTRAINT unique_user_gpts UNIQUE (user_email, gpts_uuid) 
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    nickname VARCHAR(255),
    avatar_url VARCHAR(255),
    created_at timestamptz
);