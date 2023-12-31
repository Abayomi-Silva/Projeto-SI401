<?php
    session_start();
?>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles/layout.css">
        <link rel="stylesheet" href="./styles/style.css">
        <link rel="icon" href="images/logo.ico">

        <title>Tetris</title>
    </head>
    <body>
        <div class="background"></div>

        <div class="logo">
            <img src="./images/logo.jpg" alt="logo tetris">
        </div>

        <div class="login">
            <form method="POST" action="backend/login.php">
                <input type="text" class="input-form" id="usuario"
                    name="userLogin" placeholder="Usuário" required>

                <input type="password" class="input-form" id="senha"
                    name="userPwd" placeholder="Senha" required>

                <input type="submit" class="button" id="enviar"
                    value="Enviar" name="login">
            </form>
        </div>

        <div class="botao">
            <a href="cadastro.php" class="button">Cadastrar</a>
        </div>
    </body>
</html>
