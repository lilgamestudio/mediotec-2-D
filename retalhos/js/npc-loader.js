async function getNPCData(){

    const response =
        await fetch("data/npcs.json");

    return await response.json();

}

async function renderNPCMenu(containerId){

    const npcs =
        await getNPCData();

    const container =
        document.getElementById(containerId);

    container.innerHTML = "";

    Object.entries(npcs).forEach(
        ([id, npc]) => {

        const card =
            document.createElement("div");

        card.className =
            "npc-card";

        const unlocked =
            id === "ana" ||
            isUnlocked(id);

        if(unlocked){

            card.innerHTML = `
                <a href="npcs/${id}.html">
                    ${npc.name}
                </a>
            `;

        }else{

            card.innerHTML = `
                🔒 ${npc.name}
            `;

        }

        container.appendChild(card);

    });

}
