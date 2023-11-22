<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./styles/pop_up.css">
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
                <h1>MENU</h1>
            </div>

            <div class="checkboxes">
                <p>Modo de Jogo</p>
                <div class="toggle">
                    <div class="toggle">
                        <input type="radio" id="bar" name="on-off" checked>Clássico
                        <label for="bar">ON|OFF</label>
                    </div>

                    <input type="radio" name="on-off" id="foo">Avançado
                    <label for="foo">ON|OFF</label>
                </div>
            </div>

            <div class="botao">
                <nav>
                    <a href="Home.php" class="button voltar">Voltar</a>
                </nav>

                <nav>
                    <a href="Ranking_class_pessoal.php" class="button">Ranking Pessoal</a>
                </nav>

                <nav>
                    <a href="Editar_perfil.php" class="button">Editar Perfil</a>
                </nav>

                <a href="backend/logout.php" class="button sair" id="logout">Logout</a>
            </div>

            <footer>Tetris - Grupo 07</footer>
        </div>

    </body>
</html>
