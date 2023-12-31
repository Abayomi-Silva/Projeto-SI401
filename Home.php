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
        <link rel="stylesheet" href="styles/home.css">
        <link rel="stylesheet" href="styles/style.css">
        <link rel="icon" href="images/logo.ico">

        <title>MT Tetris</title>
    </head>

    <body>
        <div class="background"></div>

        <div class="container">
            <div class="left-box">
                <img src="./images/logo.jpg"
                    alt="Imagem do jogo Tetris" id="logo">

                <div class="info-box">
                    <label>Pontuação</label>
                    <p class="lbl" id="game_pontuacao">0</p>
                </div>

                <div class="info-box">
                    <label>Linhas Eliminadas</label>
                    <p class="lbl" id="game_linhas_eliminadas">0</p>
                </div>

                <div class="info-box">
                    <label>Tempo</label>
                    <p class="lbl" id="game_tempo">00:00</p>
                </div>

                <div class="info-box">
                    <label>Nível</label>
                    <p class="lbl" id="game_nivel">1</p>
                </div>
            </div>

            <div class="center-box border-fix">
                <canvas class="game-window" style="display:none"
                    id="game_canvas">
                </canvas>

                <div class="game-window" id="game_overlay">
                    <p id="game_overlay_text">Iniciar</p>
                    <button id="game_overlay_button">Publicar Score</button>
                </div>
            </div>

            <div class="right-box">
                <div class="next-block-box">
                    <h2>Próximo Bloco</h2>
                    <img src="./images/pieces/Special_piece.png"
                        id="game_next_piece"
                        alt="Próximo Bloco">
                </div>

                <img src="./images/pause.jpg" id="game_pause" alt="Pause">
                <div class="botao">
                    <a href="Menu.php" class="button">Menu</a>
                </div>

                <div class="control">
                    <h2>Controles</h2>
                    <img src="./images/controles.png" id="controles"
                        alt="Imagem dos controles">
                </div>
            </div>
        </div>
        <script defer src="src/pieces.js"> </script>
        <script defer src="src/main.js"> </script>
    </body>
</html>
