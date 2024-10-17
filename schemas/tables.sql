-- CREATE DATABASE radar;

DROP TABLE IF EXISTS events;
DROP TABLE IF EXISTS locations;
DROP TABLE IF EXISTS phases;

CREATE TABLE locations (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  url TEXT NOT NULL,
  type VARCHAR(255) NOT NULL
);

CREATE TABLE events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  event_date TIMESTAMP WITH TIME ZONE NOT NULL,
  description TEXT,
  type VARCHAR(255) NOT NULL,
  is_public BOOLEAN NOT NULL,
  is_mandatory BOOLEAN NOT NULL,
  location_id INT,
  FOREIGN KEY (location_id) REFERENCES locations(id)
);

CREATE TABLE phases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  date_from TIMESTAMP WITH TIME ZONE NOT NULL,
  date_to TIMESTAMP WITH TIME ZONE NOT NULL
);
