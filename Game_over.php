<?php
    session_start();
    if(!isset($_SESSION['usuario'])){
        header("location:index.php");
    }
?>
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="styles/pop_up.css">
        <link rel="stylesheet" href="styles/style.css">
        <link rel="icon" href="images/logo.ico">

        <title>Tetris</title>
    </head>
    <body>
        <div class="background"></div>
        <div class="pop-up">
            <a href="Home.php"><img src="./images/fechar.png" alt="Sair"
                    id="sair"></a>
            <div class="menu">
                <h1>GAME OVER</h1>
            </div>

            <div class="info">
                <label>Pontuação</label>
                <p class="lbl">2140</p>
            </div>

            <div class="info">
                <label>Linhas Eliminadas</label>
                <p class="lbl">84</p>
            </div>

            <div class="info">
                <label>Tempo</label>
                <p class="lbl">12:25</p>
            </div>

            <div class="info">
                <label>Nível</label>
                <p class="lbl">4</p>
            </div>

            <a href="Login.php" class="button sair" id="logout">Logout</a>

            <footer>Tetris - Grupo 07</footer>
        </div>
    </body>
</html>
