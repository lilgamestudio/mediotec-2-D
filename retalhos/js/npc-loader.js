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
        const completed = isCompleted(id);

        if(unlocked){
            card.className = completed ? "npc-card unlocked completed" : "npc-card unlocked";
            card.innerHTML = `
                <h3 style="margin: 0 0 10px 0;">🟢 ${npc.name}</h3>
                <div style="font-size: 14px; color: #45f3ff;">${npc.theme}</div>
            `;
            card.onclick = () => {
                playSound('click');
                smoothNavigate(`npcs/${id}.html`);
            };
        } else {
            card.className = "npc-card locked";
            card.innerHTML = `
                <h3 style="margin: 0 0 10px 0; color: #444;">🔒 Bloqueado</h3>
                <div style="font-size: 12px; color: #333;">Investigue mais pistas</div>
            `;
        }

        container.appendChild(card);
    });
}
