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
                <a href="Ranking_class_global.php"
                    class="btrank">Modo Clássico</a>
            </div>
        </nav>

        <nav>
            <div class="botao">
                <a href="Ranking_avan_global.php"
                    class="button">Modo Avançado</a>
            </div>
        </nav>

        <div class="table">
            <h1>Ranking Global Clássico</h1>

            <table>
                <tr>
                    <th>N°</th>
                    <th>NOME</th>
                    <th>PONTUAÇÃO</th>
                    <th>NÍVEL</th>
                    <th>TEMPO</th>
                </tr>
                <?php /*
                    $sql_rankclass_p = "SELECT * FROM ranking INNER JOIN usuarios on ranking.userPlayer = usuarios.usuario ORDER BY pontuacao DESC LIMIT 10";
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
                    <td>Neymar</td>
                    <td>5430</td>
                    <td>18</td>
                    <td>26:07</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Bruninha</td>
                    <td>5410</td>
                    <td>18</td>
                    <td>25:!2</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Casemiro</td>
                    <td>5160</td>
                    <td>17</td>
                    <td>25:57</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Richarlison</td>
                    <td>4920</td>
                    <td>16</td>
                    <td>24:13</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Vini.jr</td>
                    <td>4700</td>
                    <td>16</td>
                    <td>21:51</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Camila</td>
                    <td>4670</td>
                    <td>16</td>
                    <td>24:41</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Gabriel.J.</td>
                    <td>4290</td>
                    <td>15</td>
                    <td>21:08</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>Paquetá</td>
                    <td>4140</td>
                    <td>14</td>
                    <td>20:28</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>Militão</td>
                    <td>4090</td>
                    <td>14</td>
                    <td>21:40</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>Alisson</td>
                    <td>4010</td>
                    <td>14</td>
                    <td>20:18</td>
                </tr>
            </table>
            <h2>Melhor Pontuação</h2>
            <table>
                <tr>
                    <th>N°</th>
                    <th>NOME</th>
                    <th>PONTUAÇÃO</th>
                    <th>NÍVEL</th>
                    <th>TEMPO</th>
                </tr>
                <tr>
                    <td>11</td>
                    <td>João</td>
                    <td>3920</td>
                    <td>14</td>
                    <td>17:07</td>
                </tr>
            </table>
            <br>
        </div>

        <nav class="botao">
            <a href="Ranking_class_pessoal.php" class="button">Ranking Pessoal</a>
        </nav>

        <nav class="botao">
            <a href="Home.php" class="button">Home</a>
        </nav>
    </body>
</html>
