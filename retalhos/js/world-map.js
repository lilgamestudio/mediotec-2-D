// Motor do Mapa Topdown - Fashion Trace
let mapInitialized = false;

function initWorldMap() {
    if (mapInitialized) return; // Evita duplicar loops de frames
    mapInitialized = true;

    const canvas = document.getElementById("worldMap");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    // Configurações do Jogador (Ronin/Investigador tático minimalista)
    const player = {
        x: 100,
        y: 225,
        size: 16,
        speed: 4,
        color: "#43d8ff" // Azul néon marcante do jogo
    };

    // Mapeamento de Posições fixas para os teus NPCs no Canvas (Eixo X, Eixo Y)
    const npcsPositions = {
        ana: { name: "Ana Silva", x: 250, y: 120, color: "#2ecc71" },
        carlos: { name: "Carlos Mendes", x: 450, y: 120, color: "#f1c40f" },
        helena: { name: "Helena Rocha", x: 250, y: 320, color: "#9b59b6" },
        felipe: { name: "Felipe Costa", x: 450, y: 320, color: "#e67e22" },
        diogo: { name: "Diogo Moreno (BOSS)", x: 680, y: 225, color: "#ff4343" }
    };

    // Estado das Teclas Pressionadas
    const keys = {};

    // Ouvintes de teclado para movimento fluido
    window.addEventListener("keydown", (e) => {
        keys[e.key.toLowerCase()] = true;
        keys[e.key] = true; // Captura setas direcionais puras
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key.toLowerCase()] = false;
        keys[e.key] = false;
    });

    // Loop principal do jogo rodando nativamente no RequestAnimationFrame do monitor
    function gameLoop() {
        update();
        draw();
        requestAnimationFrame(gameLoop);
    }

    // Processamento de Lógica de Movimento e Colisão
    function update() {
        // Movimento Horizontal
        if (keys["a"] || keys["arrowleft"]) player.x -= player.speed;
        if (keys["d"] || keys["arrowright"]) player.x += player.speed;
        
        // Movimento Vertical
        if (keys["w"] || keys["arrowup"]) player.y -= player.speed;
        if (keys["s"] || keys["arrowdown"]) player.y += player.speed;

        // Limites de colisão com as bordas do Canvas
        if (player.x < 0) player.x = 0;
        if (player.x > canvas.width - player.size) player.x = canvas.width - player.size;
        if (player.y < 0) player.y = 0;
        if (player.y > canvas.height - player.size) player.y = canvas.height - player.size;

        // Verificar colisão com os NPCs ativos
        Object.entries(npcsPositions).forEach(([id, npc]) => {
            // Regra de desbloqueio herdada do teu game.js original
            const isNpcUnlocked = id === "ana" || (typeof isUnlocked === "function" && isUnlocked(id));

            if (isNpcUnlocked) {
                // Cálculo de proximidade por caixa delimitadora (AABB collision)
                const distanceX = Math.abs((player.x + player.size / 2) - npc.x);
                const distanceY = Math.abs((player.y + player.size / 2) - npc.y);

                if (distanceX < 20 && distanceY < 20) {
                    // Reseta as teclas para parar o movimento no redirecionamento
                    keys["w"] = keys["a"] = keys["s"] = keys["d"] = false;
                    keys["arrowup"] = keys["arrowdown"] = keys["arrowleft"] = keys["arrowright"] = false;

                    // Entra instantaneamente na rota do NPC correspondente
                    window.location.href = `npcs/${id}.html`;
                }
            }
        });
    }

    // Desenho Gráfico no Canvas
    function draw() {
        // 1. Limpa o ecrã com a cor de fundo tática
        ctx.fillStyle = "#161d1a";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // 2. Desenha uma grelha cyberpunk minimalista no plano de fundo para dar sensação de profundidade
        ctx.strokeStyle = "rgba(67, 216, 255, 0.04)";
        ctx.lineWidth = 1;
        const gridSize = 40;
        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
        }
        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
        }

        // 3. Renderiza os NPCs no mapa
        Object.entries(npcsPositions).forEach(([id, npc]) => {
            const isNpcUnlocked = id === "ana" || (typeof isUnlocked === "function" && isUnlocked(id));
            const isNpcCompleted = typeof isCompleted === "function" && isCompleted(id);

            if (isNpcUnlocked) {
                // Efeito visual de raio de alcance ou aura para indicar interatividade
                ctx.beginPath();
                ctx.arc(npc.x, npc.y, 25, 0, Math.PI * 2);
                ctx.fillStyle = isNpcCompleted ? "rgba(46, 204, 113, 0.15)" : "rgba(67, 216, 255, 0.1)";
                ctx.fill();

                // Corpo do NPC
                ctx.beginPath();
                ctx.arc(npc.x, npc.y, 10, 0, Math.PI * 2);
                ctx.fillStyle = npc.color;
                ctx.fill();
                ctx.lineWidth = 2;
                ctx.strokeStyle = "#fff";
                ctx.stroke();

                // Texto informativo superior (Nome do Alvo)
                ctx.fillStyle = "#ffffff";
                ctx.font = "bold 12px Arial";
                ctx.textAlign = "center";
                ctx.fillText(isNpcCompleted ? `✓ ${npc.name}` : npc.name, npc.x, npc.y - 16);
            } else {
                // Desenha o NPC ocultado/bloqueado como um elemento tático encriptado
                ctx.beginPath();
                ctx.arc(npc.x, npc.y, 10, 0, Math.PI * 2);
                ctx.fillStyle = "#333333";
                ctx.fill();
                
                ctx.fillStyle = "#666666";
                ctx.font = "11px Arial";
                ctx.textAlign = "center";
                ctx.fillText("🔒 Bloqueado", npc.x, npc.y - 16);
            }
        });

        // 4. Desenha o Investigador (Jogador) com um anel luminoso
        ctx.shadowBlur = 10;
        ctx.shadowColor = player.color;
        
        ctx.fillStyle = player.color;
        ctx.fillRect(player.x, player.y, player.size, player.size);
        
        // Remove os efeitos de sombra para os elementos seguintes não ficarem desfocados
        ctx.shadowBlur = 0; 
    }

    // Arranca o Loop do Ciclo Gráfico
    gameLoop();
}
