-- Create the database if it doesn't exist
CREATE DATABASE mybiz_db;

-- Create the user if it doesn't exist
DO $$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'mybiz_db') THEN
      CREATE ROLE mybiz_dev WITH LOGIN PASSWORD 'mybiz_pwd';
   END IF;
END
$$;

-- Grant all privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE mybiz_db TO mybiz_dev;