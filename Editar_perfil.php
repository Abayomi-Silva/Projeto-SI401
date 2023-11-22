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
        <link rel="stylesheet" href="./styles/style.css">
        <link rel="icon" href="images/logo.ico">
        <link rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">

        <title>Tetris</title>
    </head>
    <body>
        <div class="background"></div>

        <div class="logo">
            <img src="./images/logo.jpg" id="logoMenor"
                alt="logo tetris">
        </div>

        <div class="login">
            <form>
                <div class="form-group">
                    <input type="text" class="input-form" id="nome"
                        name="nome" placeholder="Nome Completo" required>
                </div>

                <div class="locked">
                    <input type="date" class="input-form"
                        id="dataNascimento" name="dataNascimento"
                         disabled>
                    <span class="icon"><i class="fas fa-lock"></i></span>
                </div>

                <div class="locked">
                    <input type="number" class="input-form" id="cpf"
                        name="cpf" placeholder="CPF" disabled>
                    <span class="icon"><i class="fas fa-lock"></i></span>
                </div>

                <div class="form-group">
                    <input type="number" class="input-form" id="telefone"
                        name="telefone" placeholder="Telefone" required>
                </div>

                <div class="form-group">
                    <input type="email" class="input-form" id="email"
                        name="email" placeholder="E-mail" required>
                </div>

                <div class="locked">
                    <input type="text" class="input-form" id="usuario"
                        name="usuario" placeholder="Usuário" disabled>
                    <span class="icon"><i class="fas fa-lock"></i></span>
                </div>

                <div class="form-group">
                    <input type="password" class="input-form"
                        id="senha" name="senha" minlength="8"
                        placeholder="Senha" required>
                </div>

                <div class="form-group">
                    <input type="password" class="input-form"
                        id="confirmarSenha"
                        name="confirmarSenha" minlength="8"
                        placeholder="Confirmar Senha" required>
                </div>

                <div class="position-botao">
                    <div class="botao">
                        <input type="submit" class="button" id="atualizar"
                            value="Atualizar">
                    </div>
                </div>
            </form>

            <div class="botao">
                <a href="Menu.php" class="button">Voltar</a>
            </div>

        </div>

    </body>
</html>
