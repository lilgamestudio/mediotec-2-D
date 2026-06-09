<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Fashion Trace - Painel de Investigação</title>
    <link rel="stylesheet" href="css/style.css">
    <style>
        /* Estilos para o Sistema de Abas */
        .tab-container {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
        }
        .tab-btn {
            background: #222;
            color: #aaa;
            border: 2px solid #333;
            padding: 10px 20px;
            cursor: pointer;
            font-weight: bold;
            border-radius: 5px;
            transition: all 0.2s ease;
        }
        .tab-btn.active {
            background: #43d8ff;
            color: #111;
            border-color: #43d8ff;
        }
        .tab-content {
            display: none;
        }
        .tab-content.active {
            display: block;
        }
        /* Centralização do Canvas do Jogo */
        #canvas-wrapper {
            text-align: center;
            background: #151515;
            padding: 15px;
            border-radius: 8px;
            border: 2px solid #222;
        }
        canvas {
            background: #1a221d; /* Fundo que lembra relva/piso escuro */
            border: 3px solid #333;
            border-radius: 4px;
            display: block;
            margin: 0 auto;
        }
        .controls-hint {
            color: #888;
            font-size: 0.9rem;
            margin-top: 8px;
        }
    </style>
</head>
<body>

    <h1>Fashion Trace</h1>
    
    <div style="margin-bottom: 20px;">
        <button onclick="resetProgress()">Reset Progress</button>
    </div>

    <div class="tab-container">
        <button class="tab-btn active" onclick="switchTab('map-view')">🗺️ Mapa Topdown</button>
        <button class="tab-btn" onclick="switchTab('list-view')">📋 Lista de Alvos</button>
    </div>

    <div id="map-view" class="tab-content active">
        <div id="canvas-wrapper">
            <canvas id="worldMap" width="800" height="450"></canvas>
            <p class="controls-hint">Usa as setas do teclado (<b>▲ ▼ ◀ ▶</b>) ou as teclas <b>W, A, S, D</b> para mover o teu investigador.</p>
        </div>
    </div>

    <div id="list-view" class="tab-content">
        <div id="npcList"></div>
    </div>

    <script src="js/game.js"></script>
    <script src="js/npc-loader.js"></script>
    <script src="js/world-map.js"></script>

    <script>
        // Inicializa o menu clássico na aba secundária
        renderNPCMenu("npcList");

        // Função nativa para gerir a troca de Abas
        function switchTab(tabId) {
            document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
            document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));
            
            document.getElementById(tabId).classList.add('active');
            event.target.classList.add('active');

            // Foca o canvas automaticamente ao entrar na aba do mapa para aceitar comandos de teclado imediatamente
            if (tabId === 'map-view' && typeof initWorldMap === 'function') {
                initWorldMap();
            }
        }

        // Inicia o mapa assim que a página carregar
        window.addEventListener('DOMContentLoaded', () => {
            initWorldMap();
        });
    </script>
</body>
</html>
