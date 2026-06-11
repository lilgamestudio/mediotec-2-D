// Motor do Mapa Topdown - Fashion Trace
let mapInitialized = false;

// 1. Definição dos 3 mundos e a distribuição tática dos teus NPCs
const worlds = [
    {
        name: "Distrito de Alta Costura",
        bgColor: "#161d1a", // O teu verde tático escuro original
        gridColor: "rgba(67, 216, 255, 0.04)",
        npcs: {
            ana: { name: "Ana Silva", x: 250, y: 120, color: "#2ecc71" },
            carlos: { name: "Carlos Mendes", x: 550, y: 120, color: "#f1c40f" }
        }
    },
    {
        name: "Fábrica Têxtil Abandonada",
        bgColor: "#221a1a", // Tom avermelhado industrial
        gridColor: "rgba(230, 126, 34, 0.04)",
        npcs: {
            helena: { name: "Helena Rocha", x: 250, y: 320, color: "#9b59b6" },
            felipe: { name: "Felipe Costa", x: 550, y: 320, color: "#e67e22" }
        }
    },
    {
        name: "Mercado Negro de Tecidos",
        bgColor: "#14141c", // Tom azul noite/subterrâneo
        gridColor: "rgba(168, 67, 255, 0.04)",
        npcs: {
            diogo: { name: "Diogo Moreno (BOSS)", x: 680, y: 225, color: "#ff4343" }
        }
    }
];

let currentWorldIndex = 0; // Começa no Distrito de Alta Costura
let canvas, ctx;

// Configurações do Jogador (Ronin/Investigador tático minimalista)
const player = {
    x: 100,
    y: 225,
    size: 16,
    speed: 4,
    color: "#43d8ff" // Azul néon marcante do jogo
};

// Estado das Teclas Pressionadas
const keys = {};

// Função que atualiza o indicador visual de qual parte do mundo o jogador está
function updateWorldUI() {
    const titleElement = document.getElementById('current-world-title');
    if (titleElement) {
        titleElement.innerText = worlds[currentWorldIndex].name;
    }
}

function initWorldMap() {
    if (mapInitialized) return; // Evita duplicar loops de frames
    mapInitialized = true;

    canvas = document.getElementById("worldMap");
    if (!canvas) return;
    ctx = canvas.getContext("2d");

    // Inicializa a interface com o mundo correto
    updateWorldUI();

    // Ouvintes de teclado para movimento fluido e troca de mundos
    window.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();
        keys[key] = true;
        keys[e.key] = true; // Captura setas direcionais puras

        // --- SISTEMA DE CARROSSEL (Q e E) ---
        if (key === 'q') {
            currentWorldIndex = (currentWorldIndex - 1 + worlds.length) % worlds.length;
            updateWorldUI();
        } 
        else if (key === 'e') {
            currentWorldIndex = (currentWorldIndex + 1) % worlds.length;
            updateWorldUI();
        }
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key.toLowerCase()] = false;
        keys[e.key] = false;
    });

    // Arranca o Loop do Ciclo Gráfico
    requestAnimationFrame(gameLoop);
}

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

    // Obter apenas os NPCs do mapa em que o jogador se encontra atualmente
    const activeNPCs = worlds[currentWorldIndex].npcs;

    // Verificar colisão com os NPCs ativos do mundo atual
    Object.entries(activeNPCs).forEach(([id, npc]) => {
        const isNpcUnlocked = id === "ana" || (typeof isUnlocked === "function" && isUnlocked(id));

        if (isNpcUnlocked) {
            // Cálculo de proximidade por caixa delimitadora (AABB collision)
            const distanceX = Math.abs((player.x + player.size / 2) - npc.x);
            const distanceY = Math.abs((player.y + player.size / 2) - npc.y);

            if (distanceX < 20 && distanceY < 20) {
                // Reseta as teclas para parar o movimento no redirecionamento
                for (let key in keys) keys[key] = false;

                // Entra instantaneamente na rota do NPC correspondente
                window.location.href = `npcs/${id}.html`;
            }
        }
    });
}

// Desenho Gráfico no Canvas
function draw() {
    const currentWorld = worlds[currentWorldIndex];

    // 1. Limpa o ecrã com a cor de fundo do mundo ativo
    ctx.fillStyle = currentWorld.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Desenha a grelha cyberpunk com a cor customizada do mundo ativo
    ctx.strokeStyle = currentWorld.gridColor;
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    // 3. Renderiza apenas os NPCs do mundo ativo
    Object.entries(currentWorld.npcs).forEach(([id, npc]) => {
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

    // 4. Desenha o Investigador (Jogador) com o anel luminoso original
    ctx.shadowBlur = 10;
    ctx.shadowColor = player.color;
    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    ctx.shadowBlur = 0; 
}
