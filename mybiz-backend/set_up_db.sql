CREATE DATABASE IF NOT EXISTS mybiz_db;

CREATE USER  'mybiz_dev' @'localhost' IDENTIFIED BY 'mybiz_pwd';

GRANT ALL PRIVILEGES ON `mybiz_db`.* TO 'mybiz_dev' @'localhost';

GRANT SELECT ON `performance_schema`.* TO 'mybiz_dev' @'localhost';

FLUSH PRIVILEGES;
