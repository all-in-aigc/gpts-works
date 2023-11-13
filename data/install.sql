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
    index_updated_at INT NOT NULL DEFAULT 0
);