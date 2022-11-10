DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE users(
    id SERIAL,
    username VARCHAR(100)
);
CREATE TABLE posts();

INSERT INTO users(username) VALUES('bob');