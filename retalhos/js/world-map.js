// Motor do Mapa Topdown - Fashion Trace
let mapInitialized = false;

// 1. Definição dos 3 mundos e a distribuição tática dos teus NPCs
const worlds = [
    {
        name: "Distrito de Alta Costura",
        bgColor: "#161d1a", 
        gridColor: "rgba(67, 216, 255, 0.04)",
        npcs: {
            ana: { name: "Ana Silva", x: 250, y: 120, color: "#2ecc71" },
            carlos: { name: "Carlos Mendes", x: 550, y: 120, color: "#f1c40f" }
        }
    },
    {
        name: "Fábrica Têxtil Abandonada",
        bgColor: "#221a1a", 
        gridColor: "rgba(230, 126, 34, 0.04)",
        npcs: {
            helena: { name: "Helena Rocha", x: 250, y: 320, color: "#9b59b6" },
            felipe: { name: "Felipe Costa", x: 550, y: 320, color: "#e67e22" }
        }
    },
    {
        name: "Mercado Negro de Tecidos",
        bgColor: "#14141c", 
        gridColor: "rgba(168, 67, 255, 0.04)",
        npcs: {
            diogo: { name: "Diogo Moreno (BOSS)", x: 680, y: 225, color: "#ff4343" }
        }
    }
];

let currentWorldIndex = 0; 
let canvas, ctx;

const player = {
    x: 100,
    y: 225,
    size: 16,
    speed: 4,
    color: "#43d8ff" 
};

const keys = {};

function updateWorldUI() {
    const titleElement = document.getElementById('current-world-title');
    if (titleElement) {
        titleElement.innerText = worlds[currentWorldIndex].name;
    }
}

function initWorldMap() {
    if (mapInitialized) return; 
    mapInitialized = true;

    canvas = document.getElementById("worldMap");
    if (!canvas) return;
    ctx = canvas.getContext("2d");

    updateWorldUI();

    window.addEventListener("keydown", (e) => {
        const key = e.key.toLowerCase();

        // --- CORREÇÃO CRÍTICA DO CARROSSEL ---
        // Deteta o clique único e não adiciona ao objeto "keys" de movimento contínuo
        if (key === 'q') {
            currentWorldIndex = (currentWorldIndex - 1 + worlds.length) % worlds.length;
            updateWorldUI();
            return; // Para a execução aqui para não registar no movimento
        } 
        else if (key === 'e') {
            currentWorldIndex = (currentWorldIndex + 1) % worlds.length;
            updateWorldUI();
            return; // Para a execução aqui para não registar no movimento
        }

        // Se não for Q ou E, regista normalmente para o movimento do boneco
        keys[key] = true;
        keys[e.key] = true; 
    });

    window.addEventListener("keyup", (e) => {
        keys[e.key.toLowerCase()] = false;
        keys[e.key] = false;
    });

    requestAnimationFrame(gameLoop);
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    if (keys["a"] || keys["arrowleft"]) player.x -= player.speed;
    if (keys["d"] || keys["arrowright"]) player.x += player.speed;
    if (keys["w"] || keys["arrowup"]) player.y -= player.speed;
    if (keys["s"] || keys["arrowdown"]) player.y += player.speed;

    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width - player.size) player.x = canvas.width - player.size;
    if (player.y < 0) player.y = 0;
    if (player.y > canvas.height - player.size) player.y = canvas.height - player.size;

    const activeNPCs = worlds[currentWorldIndex].npcs;

    Object.entries(activeNPCs).forEach(([id, npc]) => {
        const isNpcUnlocked = id === "ana" || (typeof isUnlocked === "function" && isUnlocked(id));

        if (isNpcUnlocked) {
            const distanceX = Math.abs((player.x + player.size / 2) - npc.x);
            const distanceY = Math.abs((player.y + player.size / 2) - npc.y);

            if (distanceX < 20 && distanceY < 20) {
                for (let key in keys) keys[key] = false;
                window.location.href = `npcs/${id}.html`;
            }
        }
    });
}

function draw() {
    const currentWorld = worlds[currentWorldIndex];

    ctx.fillStyle = currentWorld.bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = currentWorld.gridColor;
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
    }

    Object.entries(currentWorld.npcs).forEach(([id, npc]) => {
        const isNpcUnlocked = id === "ana" || (typeof isUnlocked === "function" && isUnlocked(id));
        const isNpcCompleted = typeof isCompleted === "function" && isCompleted(id);

        if (isNpcUnlocked) {
            ctx.beginPath();
            ctx.arc(npc.x, npc.y, 25, 0, Math.PI * 2);
            ctx.fillStyle = isNpcCompleted ? "rgba(46, 204, 113, 0.15)" : "rgba(67, 216, 255, 0.1)";
            ctx.fill();

            ctx.beginPath();
            ctx.arc(npc.x, npc.y, 10, 0, Math.PI * 2);
            ctx.fillStyle = npc.color;
            ctx.fill();
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#fff";
            ctx.stroke();

            ctx.fillStyle = "#ffffff";
            ctx.font = "bold 12px Arial";
            ctx.textAlign = "center";
            ctx.fillText(isNpcCompleted ? `✓ ${npc.name}` : npc.name, npc.x, npc.y - 16);
        } else {
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

    ctx.shadowBlur = 10;
    ctx.shadowColor = player.color;
    
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
    
    ctx.shadowBlur = 0; 
}
