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
            <div class="botao"><a href="Ranking_class_pessoal.php"
                    class="button">Modo Clássico</a>
            </div>
        </nav>
        <nav>
            <div class="botaorank">
                <a href="Ranking_avan_pessoal.php"
                    class="btrank">Modo Avançado</a>
            </div>
        </nav>

        <div class="table">
            <h1>Ranking Pessoal Avançado</h1>

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
                    <td>Joãozinho</td>
                    <td>7050</td>
                    <td>24</td>
                    <td>44:30</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>João</td>
                    <td>6840</td>
                    <td>23</td>
                    <td>42:43</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>João</td>
                    <td>6800</td>
                    <td>23</td>
                    <td>41:13</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Joãozinho</td>
                    <td>6430</td>
                    <td>22</td>
                    <td>44:04</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>João</td>
                    <td>6260</td>
                    <td>21</td>
                    <td>39:24</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>João</td>
                    <td>5670</td>
                    <td>18</td>
                    <td>37:30</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Joãozinho</td>
                    <td>5190</td>
                    <td>18</td>
                    <td>38:27</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>João</td>
                    <td>4780</td>
                    <td>16</td>
                    <td>36:01</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>João</td>
                    <td>4550</td>
                    <td>16</td>
                    <td>33:32</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>João</td>
                    <td>4120</td>
                    <td>14</td>
                    <td>34:25</td>
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
                    <td>Joãozinho</td>
                    <td>7050</td>
                    <td>24</td>
                    <td>44:30</td>
                </tr>
            </table>
            <br>
            <br>
        </div>

        <nav class="botao">
            <a href="Ranking_avan_global.php" class="button">Ranking Global</a>
        </nav>

        <nav class="botao">
            <a href="Home.php" class="button">Home</a>
        </nav>
    </body>
</html>
