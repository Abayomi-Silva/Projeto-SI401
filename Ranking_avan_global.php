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
            <div class="botao"><a href="Ranking_class_global.php"
                    class="button">Modo Clássico</a>
            </div>
        </nav>

        <nav>
            <div class="botaorank"><a href="Ranking_avan_pessoal.php"
                    class="btrank">Modo Avançado</a>
            </div>
        </nav>

        <div class="table">
            <h1>Ranking Global Avançado</h1>

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
                    <td>Tamires</td>
                    <td>9890</td>
                    <td>33</td>
                    <td>67:54</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>Anthony</td>
                    <td>9720</td>
                    <td>33</td>
                    <td>65:32</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>Leticia</td>
                    <td>9560</td>
                    <td>32</td>
                    <td>67:28</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>Barbara</td>
                    <td>8930</td>
                    <td>30</td>
                    <td>62:57</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>Antônia</td>
                    <td>8650</td>
                    <td>29</td>
                    <td>56:48</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>Raphinha</td>
                    <td>8310</td>
                    <td>28</td>
                    <td>64:11</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>Gabriel.J.</td>
                    <td>7890</td>
                    <td>27</td>
                    <td>54:58</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>Rafaelle</td>
                    <td>7250</td>
                    <td>25</td>
                    <td>53:12</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td>Militão</td>
                    <td>7240</td>
                    <td>25</td>
                    <td>56:21</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td>Joãozinho</td>
                    <td>7050</td>
                    <td>24</td>
                    <td>44:40</td>
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
                    <td>10</td>
                    <td>Joãozinho</td>
                    <td>7050</td>
                    <td>24</td>
                    <td>44:40</td>
                </tr>
            </table>
            <br>
        </div>

        <nav class="botao">
            <a href="Ranking_avan_pessoal.php"
                class="button">Ranking Pessoal</a>
        </nav>

        <nav class="botao">
            <a href="Home.php" class="button">Home</a>
        </nav>
    </body>
</html>
