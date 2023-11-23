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
        <link rel="stylesheet" href="./styles/rank.css">
        <link rel="stylesheet" href="/styles/style.css">
        <link rel="icon" href="images/logo.ico">

        <title>Ranking</title>
    </head>

    <body>
        <div class="background"></div>

        <nav>
            <div class="botaorank">
                <a href="Ranking_class_pessoal.php" class="btrank">Modo Clássico</a>
                </div>
            </nav>
        <nav>
            <div class="botao">
                <a href="Ranking_avan_pessoal.php" class="button">Modo Avançado</a>
                </div>
            </nav>

        <div class="table">
            <h1>Ranking Pessoal Clássico</h1>

            <table>
                <tr>
                    <th>N°</th>
                    <th>NOME</th>
                    <th>PONTUAÇÃO</th>
                    <th>NÍVEL</th>
                    <th>TEMPO</th>
                </tr>
                    <?php /*
                    $sql_rankclass_p = "SELECT * FROM ranking INNER JOIN usuarios on ranking.userPlayer = usuarios.usuario WHERE usuarios.usuario = {'$_SESSION['usuario']'} ORDER BY pontuacao DESC LIMIT 10";
                    include("backend/conexao.php");
                    try {
                        $stmt = $connection->prepare($sql_rankclass_p);
                        $stmt->execute();
                        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    } catch (PDOException $e) {
                        echo "Erro na consulta: " . $e->getMessage();
                    }
                    $contador=1;
                    ?>
                    <?php foreach ($result as $row): ?>
                        <tr>
                            <td><?php echo $contador++; ?></td>
                            <td><?php echo $row['nome']; ?></td>
                            <td><?php echo $row['pontuacao']; ?></td>
                            <td><?php echo $row['nivel']; ?></td>
                            <td><?php echo $row['tempoPartida']; ?></td>
                        </tr>
                    <?php endforeach;  */ ?> 
                <tr>
                    <td>1</td>
                    <td>João</td>
                    <td>3920</td>
                    <td>14</td>
                    <td>17:07</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Joãozinho</td>
                    <td>3800</td>
                    <td>13</td>
                    <td>16:26</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>João</td>
                    <td>3780</td>
                    <td>13</td>
                    <td>15:51</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>João</td>
                    <td>3520</td>
                    <td>12</td>
                    <td>16:57</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>João</td>
                    <td>3460</td>
                    <td>12</td>
                    <td>15:09</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Joãozinho</td>
                    <td>3150</td>
                    <td>11</td>
                    <td>14:25</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>João</td>
                    <td>2830</td>
                    <td>11</td>
                    <td>14:47</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>João</td>
                    <td>2680</td>
                    <td>9</td>
                    <td>13:51</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>João</td>
                    <td>2520</td>
                    <td>9</td>
                    <td>12:54</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>João</td>
                    <td>2340</td>
                    <td>8</td>
                    <td>13:14</td>
                </tr>
            </table>
            <br>
            <br>
            <table>
                <tr>
                    <th>N°</th>
                    <th>NOME</th>
                    <th>PONTUAÇÃO</th>
                    <th>NÍVEL</th>
                    <th>TEMPO</th>
                </tr>
                <tr>
                    <td>1</td>
                    <td>João</td>
                    <td>3920</td>
                    <td>14</td>
                    <td>17:07</td>
                </tr>
            </table>
            <br>
            <br>
        </div>

        <nav class="botao">
            <a href="Ranking_class_global.php" class="button">Ranking Global</a>
        </nav>

        <nav class="botao">
            <a href="Home.php" class="button">Home</a>
        </nav>
    </body>
</html>
