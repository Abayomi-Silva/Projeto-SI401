<?php
    include("conexao.php");

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $dataNascimento = $_POST["dataNascimento"];
    $cpf = $_POST["cpf"];
    $telefone = $_POST["telefone"];
    $email = $_POST["email"];
    $usuario = $_POST["usuario"];
    $senha = $_POST["senha"];

    try {
        $sql_cadastro = "INSERT INTO usuarios (nome, dataNascimento, cpf, telefone, email, usuario, senha) 
        VALUES ('$nome', $dataNascimento, $cpf, $telefone, '$email', '$usuario', '$senha')";
        $connection->exec($sql_cadastro);
    } catch (PDOException $e) {
        echo "Ocorreu um erro: " . $e->getMessage();
    }
}

?>