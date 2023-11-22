<?php
    // backend_ranking_classico.php
    include(conexao.php);

    $sql_ranking_classico = "SELECT nome, pontuacao, nivel, tempoPartida FROM ranking ORDER BY pontuacao DESC LIMIT 10";

    $script_ranking_classico = $connection->exec($sql_ranking_classico);

?>