CREATE TABLE alunos (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL,
email VARCHAR(100) UNIQUE,
senha VARCHAR(255) NOT NULL,
monitor BOOLEAN DEFAULT FALSE
);

CREATE TABLE materias (
id INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(100) NOT NULL
);

CREATE TABLE monitorias (
id INT PRIMARY KEY AUTO_INCREMENT,
id_aluno INT NOT NULL,
id_materia INT NOT NULL,
FOREIGN KEY (id_aluno) REFERENCES alunos(id),
FOREIGN KEY (id_materia) REFERENCES materias(id)
);

CREATE TABLE agendamentos (
id INT PRIMARY KEY AUTO_INCREMENT,
id_monitor INT NOT NULL,
id_aluno INT NOT NULL,
id_materia INT NOT NULL,
data_hora DATETIME NOT NULL,
status VARCHAR(20) DEFAULT 'pendente',
FOREIGN KEY (id_monitor) REFERENCES alunos(id),
FOREIGN KEY (id_aluno) REFERENCES alunos(id),
FOREIGN KEY (id_materia) REFERENCES materias(id)
);

INSERT INTO alunos (nome, email, senha, monitor) VALUES
('Abraão', 'abraao@email.com', '123456', TRUE),
('Rafael', 'rafael@email.com', 'abcdef', TRUE),
('Kauan', 'kauan@email.com', 'qwerty', FALSE);

INSERT INTO materias (nome) VALUES
('Matemática'),
('Física'),
('Química');

INSERT INTO monitorias (id_aluno, id_materia) VALUES
(1, 1),
(1, 3),
(2, 2);

INSERT INTO agendamentos (id_monitor, id_aluno, id_materia, data_hora) VALUES
(1, 3, 1, '2025-10-01 14:00:00'),
(1, 3, 3, '2025-10-02 10:00:00'),
(2, 3, 2, '2025-10-03 15:00:00');

SELECT 
    a1.nome AS aluno,
    a2.nome AS monitor,
    m.nome AS materia,
    ag.data_hora
FROM agendamentos ag
JOIN alunos a1 ON ag.id_aluno = a1.id
JOIN alunos a2 ON ag.id_monitor = a2.id
JOIN materias m ON ag.id_materia = m.id
ORDER BY ag.data_hora;