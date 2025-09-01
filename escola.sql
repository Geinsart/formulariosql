CREATE DATABASE escola;

--criar uma tabela com colunas


CREATE TABLE estudante (
    id INT(10) AUTO_INCREMENT PRIMARY KEY,
    nomecompleto VARCHAR(60) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP);


--inserir dados no banco de dados via código seql (CREATE)
INSERT INTO estudante(nomecompleto, email, senha)
VALUES ("Ana Claudia Cunha", "ana.scunha1@senacsp.edu.br", "123");
("Luis Santana", "luis@gmail.com", "456"),
("Ruam Miranda", "ruanmirando@gmail.com", "789");




--Selecionando todos os dados da tabela estudante (READ)

SELECT * FROM estudante;


--Selecionando uma coluna na tabela estudante
SELECT email FROM estudante;


--Selecionando mais de uma coluna na tabela estudante
SELECT nomecompleto, email FROM estudante;