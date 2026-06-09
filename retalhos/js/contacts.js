async function renderContacts(containerId) {
    // Como estamos dentro da pasta /npcs, voltamos um nível para ler o JSON de dados
    const response = await fetch("../data/npcs.json");
    const npcs = await response.json();
    const container = document.getElementById(containerId);
    
    if (!container) return;
    container.innerHTML = "";

    // Criamos uma lista horizontal bonita para o topo
    const navBar = document.createElement("div");
    navBar.style.display = "flex";
    navBar.style.gap = "15px";
    navBar.style.marginBottom = "20px";
    navBar.style.padding = "10px";
    navBar.style.background = "#222";
    navBar.style.borderRadius = "5px";

    Object.entries(npcs).forEach(([id, npc]) => {
        const linkEl = document.createElement("span");
        const unlocked = id === "ana" || isUnlocked(id);

        if (unlocked) {
            // CORREÇÃO CRÍTICA: O link aponta diretamente para o ficheiro na mesma pasta (ex: carlos.html)
            linkEl.innerHTML = `<a href="${id}.html" style="color: #43d8ff; text-decoration: none; font-weight: bold;">✓ ${npc.name}</a>`;
        } else {
            linkEl.innerHTML = `<span style="color: #666;">🔒 ${npc.name}</span>`;
        }

        navBar.appendChild(linkEl);
    });

    container.appendChild(navBar);
}
