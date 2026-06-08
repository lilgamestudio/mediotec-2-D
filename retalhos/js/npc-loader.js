async function getNPCData(){
    const response = await fetch("data/npcs.json");
    return await response.json();
}

async function renderNPCMenu(containerId){
    const npcs = await getNPCData();
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    Object.entries(npcs).forEach(([id, npc]) => {
        const card = document.createElement("div");
        const unlocked = id === "ana" || isUnlocked(id);

        // Adiciona as classes para a animação do CSS funcionar 🌟
        if(unlocked){
            card.className = "npc-card unlocked";
            card.innerHTML = `
                <a href="npcs/${id}.html">
                    🟢 ${npc.name}
                </a>
                <div style="font-size: 12px; color: #94a3b8; margin-top: 5px;">${npc.theme}</div>
            `;
        } else {
            card.className = "npc-card locked";
            card.innerHTML = `🔒 ${npc.name} (Bloqueado)`;
        }

        container.appendChild(card);
    });
}
