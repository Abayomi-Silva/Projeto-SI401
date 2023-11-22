<?php
    session_start();
    // Crie um banco de dados local chamado Tetris, Banco de dados criado a partir do MySql do XAMPP por isso não há senha
    $server = "localhost";
    $user = "root";
    $password = "";
    $database = "tetris";
    global $connection;
    try{
        $connection = new PDO("mysql:host=$server;dbname=$database", $user, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch(PDOException $e){
        echo "Ocorreu um erro: ". $e->getMessage();
    }
    // Criação das tabelas caso não existam
    $sql_usuarios = "CREATE TABLE IF NOT EXISTS usuarios (
        nome VARCHAR(100) NOT NULL,
        dataNascimento DATE NOT NULL,
        cpf VARCHAR(14) NOT NULL,
        telefone VARCHAR(15) NOT NULL,
        email VARCHAR(100) NOT NULL,
        usuario VARCHAR(50) UNIQUE NOT NULL PRIMARY KEY,
        senha VARCHAR(255) NOT NULL
    )";

    $sql_ranking = "CREATE TABLE IF NOT EXISTS ranking (
        userPlayer VARCHAR(50),
        tempoPartida TIME,
        pontuacao INT,
        linhasEliminadas INT,
        nivel VARCHAR(50),
        dataRegistro DATETIME,
        FOREIGN KEY (userPlayer) REFERENCES usuarios(usuario)
    )";
    
    try{
        $connection->exec($sql_usuarios);
        $connection->exec($sql_ranking);
    } catch (PDOException $e){
        echo "Ocorreu um erro: ". $e->getMessage();
    }
?>