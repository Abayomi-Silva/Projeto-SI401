<?php
    
    include("conexao.php");
    if(isset($_POST['updatePerfil'])){
        $nome = $_POST['nome'];
        $telefone = $_POST['telefone'];
        $email = $_POST['email'];
        $senha = $_POST['senha'];
        $sql_edit = "UPDATE usuarios set nome = '$nome', telefone = $telefone, email='$email', senha='$senha' WHERE usuario = '{$_SESSION['usuario']}'";
        try{
            $connection->exec($sql_edit);
            header("location: ../Home.php");
        }catch(PDOException $e){
            echo "Ocorreu um erro: ". $e->getMessage();
        }
    }
?>