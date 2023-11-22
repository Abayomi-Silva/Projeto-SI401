<?php
    include("conexao.php");

    $query = "SELECT * FROM usuarios where usuario = :usuario AND senha = :senha";
    $statement = $connection->prepare($query);
    $statement->execute(
        array(
            'usuario' => $_POST['userLogin'],
            'senha' => $_POST['userPwd']
        )
        );
        $count = $statement->rowCount();
        if($count>0){
            $_SESSION['usuario'] = $_POST['userLogin'];
            header("location:../Home.php");
        }
?>