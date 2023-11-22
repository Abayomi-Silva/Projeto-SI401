<?php
    // backend_ranking_avancado.php

    // Conectar-se ao banco de dados
    include(conexao.php);

    // Consulta para obter dados do ranking avançado 
    $sql_ranking_avancado = "SELECT nome, pontuacao, nivel, tempoPartida FROM ranking ORDER BY pontuacao DESC LIMIT 10";

    $script_ranking_avancado = $connection->exec($sql_ranking_avancado);
    
?>