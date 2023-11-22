<?php
    include(conexao.php);
    $userLogin = $_POST['userLogin'];
    $userPwd = $_POST['userPwd'];

    $sql = "SELECT * FROM usuarios where usuario = userLogin AND senha = userPwd";

    $connection->exec($sql);
?>