async function renderContacts(containerId){
    const response = await fetch("../data/npcs.json");
    const npcs = await response.json();
    const container = document.getElementById(containerId);
    container.innerHTML = "";

    Object.entries(npcs).forEach(([id, npc]) => {
        const pill = document.createElement("span");
        const unlocked = id === "ana" || isUnlocked(id);
        const completed = isCompleted(id);

        pill.className = "contact-pill";
        if (completed) {
            pill.className += " completed";
            pill.innerText = `✓ ${npc.name}`;
        } else if (unlocked) {
            pill.className += " unlocked";
            pill.innerText = `💬 ${npc.name}`;
        } else {
            pill.innerText = `🔒 ${npc.name.split(' ')[0]}`;
        }

        container.appendChild(pill);
    });
}
